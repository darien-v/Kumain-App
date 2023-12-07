import SearchForm from "./SearchForm"
import React, { useState, useEffect } from "react";
import { getAllRecipes, Recipes } from "../../Common/Services/RecipeService";
import { getSearchParams } from "../../Common/Services/RecipeService";
import { Link } from "react-router-dom";

const Search = () => {
    const [searchParams, setSearchParams] = useState([])

    
    const [ingredients, setIngredients] = useState([]);
    const [minCook, setMinCook] = useState(0);
    const [maxCook, setMaxCook] = useState(0);
    const [minPrep, setMinPrep] = useState(0);
    const [maxPrep, setMaxPrep] = useState(0);
    const [minServings, setMinServings] = useState(0);
    const [maxServings, setMaxServings] = useState(0);
    const [cuisineList, setCuisineList] = useState([]);

    useEffect(() => {
        getSearchParams().then(([ingredients, minPrep, maxPrep, minCook, maxCook, minServings, maxServings, cuisineList]) => {
            setIngredients(ingredients);
            setMinPrep(minPrep);
            setMaxPrep(maxPrep);
            setMinCook(minCook);
            setMaxCook(maxCook);
            setMinServings(minServings);
            setMaxServings(maxServings);
            setCuisineList(cuisineList)
        });
    }, []);

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        if (Recipes.collection.length){
            setRecipes(Recipes.collection);
        } else{
            getAllRecipes().then((recipes) => {
                setRecipes(recipes)
            });
        }
    }, []);
    /*
    const ingredients = [];
    var minCook = 5;
    var maxCook = 5;
    var minPrep = 5;
    var maxPrep = 5;
    var minServings = 5;
    var maxServings = 5;
    var cuisineList = [];
    */
   /*
    if (recipes) {
        recipes.map((rec)=>{
            // cook time
            console.log(rec.get("CookTime") < minCook);
            if (rec.get("CookTime") < minCook) {
                minCook = rec.get("CookTime")
            } else if (rec.get("CookTime") > maxCook) {
                maxCook = rec.get("CookTime")
            }
            // prep time
            if (rec.get("PrepTime") < minPrep) {
                minPrep = rec.get("PrepTime")
            } else if (rec.get("PrepTime") > maxPrep) {
                maxPrep = rec.get("PrepTime")
            }
            // servings
            if (rec.get("Servings") < minServings) {
                minServings = rec.get("Servings")
            } else if (rec.get("Servings") < maxServings) {
                maxServings = rec.get("Servings")
            }
        })
    }
    */
    return (
        <div>
            <SearchForm ingredients={ingredients} minCook={minCook} maxCook={maxCook} minPrep={minPrep} maxPrep={maxPrep} minServings={minServings} maxServings={maxServings} cuisineList={cuisineList}/>
        </div>
    )
}

export default Search;