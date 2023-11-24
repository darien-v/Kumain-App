const axios = require("axios");
const cheerio = require("cheerio");
const pretty = require("pretty")
//this url is the root page from which we navigate to all recipes for each cuisine type
//
const rootARURL = "https://www.allrecipes.com/cuisine-a-z-6740455"

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
    } catch (err){
        console.log(err)
    }
}
scrapeAllRecipes()