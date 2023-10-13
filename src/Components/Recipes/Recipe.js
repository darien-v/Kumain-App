import React, { useState, useEffect } from "react";
import { getAllRecipes, Recipes } from "../../Common/Services/RecipeService";
import { getCookbooks, Cookbooks } from "../../Common/Services/CookbookService";
import RecipeList from "./RecipeList";
import { Link } from "react-router-dom";

const Recipe = () => {
    const [recipes, setRecipes] = useState([]);

    const [cookbooks, setCookbooks] = useState([]);

    useEffect(() => {
        if (Recipes.collection.length){
            setRecipes(Recipes.collection);
        } else{
            getAllRecipes().then((recipes) => {
                console.log(recipes);
                setRecipes(recipes)
            });
        }
    }, []);

    useEffect(() => {
        if (Cookbooks.collection.length){
            setCookbooks(Cookbooks.collection);
        } else{
            getCookbooks().then((cookbooks) => {
                console.log(cookbooks);
                setCookbooks(cookbooks)
            });
        }
    }, []);

    return (
        <div>
        <div>
            Search for Recipes here!
            <RecipeList recipes={recipes} cookbooks={cookbooks} />
        </div>
        <Link to="/mycookbook"><button>Go to Cookbook</button></Link>
        </div>
        
    );
};

export default Recipe;