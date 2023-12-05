const express = require("express");
const scraper = require("./Scraper.js");
const app = express();
const port = 3001;

app.get("/scrapeRecipes", (req, res) =>{
    scraper.scrapeAllRecipes()
    res.send("Scraper called successfully")
})

app.listen(port, () => {
    console.log(`server is running on https://localhost:${port}`)
})