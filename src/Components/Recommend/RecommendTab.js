import React, { useState, useEffect } from "react";
import { Cookbooks, getCookbooks, getRecipesFromCookbook } from "../../Common/Services/CookbookService";
import { Recipes, getAllRecipes } from "../../Common/Services/RecipeService.js"
import Recommend from "./Recommend";

export default function RecommendTab() {
	const [cookbooks, setCookbooks] = useState([]);
	const [recipes, setRecipes] = useState([]);
    const [allRecipes, setAllRecipes] = useState([]);

	async function callScraper() {
		try {
		  await fetch('http://localhost:3001/scrapeRecipes'); 
		  console.log("successfully called scrape all recipes")
		} catch (error){
		  console.log("error calling scrapeAllRecipes: ", error)
		}
	  }

    useEffect(() => {
      callScraper()
        if (Cookbooks.collection.length){
            setCookbooks(Cookbooks.collection);
        } else{
            getCookbooks().then((cookbooks) => {
                setCookbooks(cookbooks);
				// grabbing cookbook item and then passing it into the get recipes function
				getRecipesFromCookbook(cookbooks[0]).then((recipes) => {
					setRecipes(recipes);
				})
            });
        }
    }, []);

    useEffect(() => {
      if (Recipes.collection.length){
          setAllRecipes(Recipes.collection);
      } else{
          getAllRecipes().then((recipes) => {
              setAllRecipes(recipes)
          });
      }
    }, []);

	return (
		<div>
			<div>
				<h3>Here are your Recommendations!</h3>
			</div>
			<Recommend cookbooks={cookbooks} yourRecipes={recipes} allRecipes={allRecipes} show={12} />
		</div>
	)
}