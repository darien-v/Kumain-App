const axios = require("axios");
const cheerio = require("cheerio");
const pretty = require("pretty")
const Parse = require('parse/node');
const Env = require ("./environments");
//this url is the root page from which we navigate to all recipes for each cuisine type
const rootARURL = "https://www.allrecipes.com/cuisine-a-z-6740455"
//setting an artificial limit on how many recipes can be scraped on one launch of the web app
const limit = 10

//this function assumes the string is either of the "# mins" or "# hr # mins" form
function convertMinutes(durationString){
    let totalTime = 0
    const splitString = durationString.split(" ")
    let index = 0
    if (splitString.length > 2){
        totalTime += parseInt(splitString[index])*60
        index += 2
    }
    totalTime += parseInt(splitString[index])
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
        return true, recipeName, prepTime, cookTime, servingSize, ingredients
    } catch (err){
        //currently returns error
        console.log("Couldn't retrive html")
        console.log(err)
        return false, null, null, null, null, null
    }
}

async function scrapeCuisinePage(categories, url, totalScraped = 0){
    try{
        const {data} = await axios.get(categories.link)
        const $ = cheerio.load(data)
        const topRecipes = [...$("a.comp.card--image-top.mntl-card-list-items.mntl-document-card.mntl-card.card.card--no-image")].map(e => $(e).attr("href"))
        const remainingRecipes = [...$("a.comp.mntl-card-list-items.mntl-document-card.mntl-card.card.card--no-image")].map(e => $(e).attr("href"))
        const allRecipes = topRecipes.concat(remainingRecipes)
        console.log(allRecipes)
        console.log("Recipe Count: ", allRecipes.length)
        var linkIndex = 0
        if (url != undefined){
            linkIndex = allRecipes.findIndex(x => x == url)
        }
        //this part here is where I want to actually add the recipes to our backend, but I can't do that until we can retrieve the last recipe scraped
        while ((totalScraped < limit) || (linkIndex <= allRecipes.length-1)){
            if (totalScraped == limit){
                console.log("scraped!")
                return true, limit
            }
            if (linkIndex > allRecipes.length-1){
                console.log("Scraoed what I could")
                return false, totalScraped
            }
            else{
                var scraped, name, prep, cook, serving, ingredients = scrapeRecipe(allRecipes[linkIndex])
                if (scraped){
                    
                    console.log("Name: ", name)
                    console.log("Prep Time: ", prep)
                    console.log("Cook Time: ", cook)
                    console.log("Serving Size: ", serving)
                    console.log("Ingredients: ", ingredients)
                    totalScraped ++
                    linkIndex ++
                }
            }
        }
    } catch (err){
        console.log(err)
    }
}

async function getLastRecipe(){
    const query = new Parse.Query("Recipe")
    var origin, link
    query.limit(1)
    query.descending("createdAt")
    query.find().then((results) =>{
        console.log("got most recent recipe created: ", results[0].get("name"))
        origin = results[0].get("Origin")
        link = results[0].get("Link")
    })
    //if the origin and link can't be obtained, return null
    return origin, link
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
        console.log(categoriesLinks)
        //from here we grab the links found on each page, set to limit to some arbitrary amount
        let cuisine, url = getLastRecipe()
        console.log(cuisine)
        //if cuisine is founc, start at that cuisine
        var finished = false
        var recipesScraped = 0
        var cuisineIndex = 0
        if (cuisine != undefined){
            cuisineList = categoriesLinks.map(cuisine => cuisine.name)
            cuisineIndex = cuisineList.findIndex(x => x == cuisine)
        }
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
            var isFinished, scraped = scrapeCuisinePage(categoriesLinks[cuisineIndex], url, limit-recipesScraped)
            finished = isFinished
            recipesScraped += scraped
            cuisineIndex ++
        }
    } catch (err){
        console.log(err)
    }
}
Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;
scrapeAllRecipes()