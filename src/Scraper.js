const axios = require("axios");
const cheerio = require("cheerio");
const pretty = require("pretty")
const Parse = require('parse/node');
const Env = require ("./environments");
//this url is the root page from which we navigate to all recipes for each cuisine type
const rootARURL = "https://www.allrecipes.com/cuisine-a-z-6740455"
//setting an artificial limit on how many recipes can be scraped on one launch of the web app
const limit = 10

Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;

//this function assumes the string is either of the "# mins" or "# hr # mins" form
function convertMinutes(durationString){
    let totalTime = 0
    const splitString = durationString.split(" ")
    /*
    let index = 0
    if (splitString.length > 2){
        totalTime += parseInt(splitString[index])*60
        index += 2
    }
    totalTime += parseInt(splitString[index])
    */
    for (var i = 1; i <= splitString.length-1; i+= 2){
        if (splitString[i] == "day" || splitString[i] == "days"){
            totalTime += parseInt(splitString[i-1]) * 24 * 60
        }
        if (splitString[i] == "hr" || splitString[i] == "hrs"){
            totalTime += parseInt(splitString[i-1])*60
        }
        else{
            totalTime += parseInt(splitString[i-1])
        }
    }
    return totalTime
}

//this should return if we were able to successfully scrape, the name, cook time, prep time, servings, and ingredients for a recipe
async function scrapeRecipe(link){
    try{
        const {data} = await axios.get(link)
        const $ = cheerio.load(data)
        const recipeName = $('[id="article-heading_1-0"]').text()  
        console.log(recipeName)
        //on allRecipes, the prep and cook time are always first and second respectively
        const prepTime = convertMinutes($('div.mntl-recipe-details__value:first').text())
        console.log("Prep Time: ", prepTime)
        const cookTime = convertMinutes($('div.mntl-recipe-details__value').eq(1).text())
        console.log("Cook Time: ", cookTime)
        //serving size usually third, but if additional time is involved, it could be later 
        const servingSize = parseInt($('div.mntl-recipe-details__item div.mntl-recipe-details__label:contains("Servings:")').next().text())
        console.log("Servings: ", servingSize)
        const ingredients = [...$('[data-ingredient-name="true"]')].map(e => $(e).text())
        console.log(ingredients)
        const imagePlaceholder = $('div.primary-image__media');
        var imageURL = null;
        if (imagePlaceholder.length > 0) {
            imageURL = imagePlaceholder.find('img').attr('src');
            console.log("Image URL: ", imageURL)
        }
        return [true, recipeName, prepTime, cookTime, servingSize, ingredients, imageURL]
    } catch (err){
        //currently returns error
        console.log("Couldn't retrive html")
        console.log(err)
        return [false, null, null, null, null, null]
    }
}

async function scrapeCuisinePage(categories, url, toScrape){
    try{
        var totalScraped = limit - toScrape
        const {data} = await axios.get(categories.link)
        const $ = cheerio.load(data)
        const topRecipes = [...$("a.comp.card--image-top.mntl-card-list-items.mntl-document-card.mntl-card.card.card--no-image")].map(e => $(e).attr("href"))
        const remainingRecipes = [...$("a.comp.mntl-card-list-items.mntl-document-card.mntl-card.card.card--no-image")].map(e => $(e).attr("href"))
        const allRecipes = topRecipes.concat(remainingRecipes)
        console.log(allRecipes)
        console.log("Recipe Count: ", allRecipes.length)
        var linkIndex = 0
        if (url != null || url != ""){
            linkIndex = allRecipes.findIndex(x => x == url)
            linkIndex += 1
        }
        //this part here is where I want to actually add the recipes to our backend, but I can't do that until we can retrieve the last recipe scraped
        while ((totalScraped < limit) || (linkIndex <= allRecipes.length-1)){
            console.log("scraping recipe #: ", linkIndex)
            if (totalScraped >= limit){
                console.log("scraped!")
                return [true, limit]
            }
            if (linkIndex > allRecipes.length-1){
                console.log("Scraoed what I could")
                return [false, totalScraped]
            }
            else{
                console.log("trying to scrape")
                var [scraped, name, prep, cook, serving, ingredients, imageURL] = await scrapeRecipe(allRecipes[linkIndex])
                if (scraped){
                    /*
                    console.log("Name: ", name)
                    console.log("Prep Time: ", prep)
                    console.log("Cook Time: ", cook)
                    console.log("Serving Size: ", serving)
                    console.log("Ingredients: ", ingredients)
                    */
                    const Recipe = Parse.Object.extend("Recipe")
                    const recipe = new Recipe()
                    recipe.set("name", name) 
                    recipe.set("PrepTime", prep)
                    recipe.set("CookTime", cook)
                    recipe.set("Servings", serving)
                    recipe.set("Ingredients", ingredients)
                    recipe.set("ImageURL", imageURL)
                    recipe.set("Origin", categories.name)
                    recipe.set("Link", allRecipes[linkIndex])
                    if (totalScraped == limit-1){
                        console.log("last in cycle, setting to true")
                        recipe.set("lastInCycle", true)
                    } else {
                        recipe.set("lastInCycle", false)
                    }
                    recipe.save().then((recipe) => {
                        console.log("recipe ", name, " has been saved")
                        totalScraped += 1
                    }, (error) => {
                        console.log("failed to create object for ", name, "will skip")
                        
                    })
                    
                }
                linkIndex ++
            }
            console.log("total scraped: ", totalScraped)
        }
    } catch (err){
        console.log(err)
        return [false, 0]
    }
}
/*
async function getLastRecipe(){
    const query = new Parse.Query("Recipe")
    var origin, link
    query.equalTo("lastInCycle", true)
    query.descending("createdAt")
    [origin, link] = query.find().then((results) =>{
        console.log("got most recent recipe created: ", results[0].get("name"))
        origin = results[0].get("Origin")
        //console.log(origin)
        link = results[0].get("Link")
        //console.log(link)
        return [origin, link]
    })
    //if the origin and link can't be obtained, return null
    return [origin, link]
}
*/
async function getLastRecipe() {
    const query = new Parse.Query("Recipe");
    let origin, link;

    try {
        query.equalTo("lastInCycle", true);
        query.descending("createdAt");

        const results = await query.find();
        
        if (results.length > 0) {
            console.log("got most recent recipe created:", results[0].get("name"));
            origin = results[0].get("Origin");
            console.log(typeof(origin))
            link = results[0].get("Link");
        } else {
            console.log("No recipes found.");
        }
    } catch (error) {
        console.error("Error fetching recipes:", error);
        // Handle error as needed
    }

    // If the origin and link can't be obtained, return null
    return [origin, link];
}
async function scrapeAllRecipes(){
    try{
        //fetch html of AllRecipes cuisine page
        const {data} = await axios.get(rootARURL)
        const markup =cheerio.load(data)
        //AllRecipes has cuisines sorted by alphabet, so we have to extract from each group, along with the URL for that page
        const categoriesLinks = [...markup(".alphabetical-list__group > ul > li > a")].map(e => ({
            name: markup(e).text().trim(),
            link: markup(e).attr("href"),
        }))
        //console.log(categoriesLinks)
        //from here we grab the links found on each page, set to limit to some arbitrary amount
        //something is wrong here, doesn't return cuisine or URL properly
        let [cuisine, url] = await getLastRecipe()
        console.log(cuisine)
        console.log("link: ", url)
        //if cuisine is founc, start at that cuisine
        var finished = false
        var recipesToScrape = limit
        var cuisineIndex = 0
        var cuisineList = categoriesLinks.map(cuisine => cuisine.name)
        if (cuisine != null || cuisine != ""){
            cuisineIndex = cuisineList.findIndex(x => x == cuisine)
        }
        console.log("Starting at: ", cuisineIndex)
        while (!finished || cuisineIndex <= categoriesLinks.length-1){
            if (finished){
                console.log(limit, " recipes scraped")
                return
            }
            if (cuisineIndex > categoriesLinks.length-1){
                console.log("scraped all remaining recipes")
                return
            }
            console.log("scraping: ", categoriesLinks[cuisineIndex])
            var [isFinished, scraped] = await scrapeCuisinePage(categoriesLinks[cuisineIndex], url, recipesToScrape)
            finished = isFinished
            recipesToScrape -= scraped
            cuisineIndex ++
        }
    } catch (err){
        console.log(err)
    }
}

module.exports = { scrapeAllRecipes };