const axios = require("axios");
const cheerio = require("cheerio");
const pretty = require("pretty")
const parse = require("parse")
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
        const {data} = await axios.get()
        const $ = cheerio.load(data)
        const recipeName = $('[id="article-heading_1-0"]').text()  
        //on allRecipes, the prep and cook time are always first and second respectively
        const prepTime = convertMinutes($('div.mntl-recipe-details__value:first').text())
        const cookTime = convertMinutes($('div.mntl-recipe-details__value:second').text())
        //serving size usually third, but if additional time is involved, it could be later 
        const servingSize = parseInt($('div.mntl-recipe-details__item:contains("Servings:").mntl-recipe-details__value').text())
        const ingredients = [...$('ul.mntl-structured-ingredients__list li span [data-ingredient-name=true]')].map(e => $(e).text())
        return true, recipeName, prepTime, cookTime, servingSize, ingredients
    } catch (err){
        //currently returns error
        console.log("Couldn't retrive html")
        console.log(err)
        return false, null, null, null, null, null
    }
}

async function scrapeCuisinePage(categories){
    try{
        const {data} = await axios.get(categories.link)
        const $ = cheerio.load(data)
        const topRecipes = [...$("a.comp.card--image-top.mntl-card-list-items.mntl-document-card.mntl-card.card.card--no-image")].map(e => $(e).attr("href"))
        const remainingRecipes = [...$("a.comp.mntl-card-list-items.mntl-document-card.mntl-card.card.card--no-image")].map(e => $(e).attr("href"))
        const allRecipes = topRecipes.concat(remainingRecipes)
        console.log(allRecipes)
        console.log("Recipe Count: ", allRecipes.length)
        console.log(scrapeRecipe(allRecipes[0]))
    } catch (err){
        console.log(err)
    }
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
        scrapeCuisinePage(categoriesLinks[0])
    } catch (err){
        console.log(err)
    }
}
scrapeAllRecipes()