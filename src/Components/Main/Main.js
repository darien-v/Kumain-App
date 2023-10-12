import React, { useState, useEffect } from "react";
import { getAllRecipes, Recipes } from "../../Common/Services/RecipeService";
import MainList from "./MainList";
import { Link } from "react-router-dom";

const Main = () => {
    const [recipes, setRecipes] = useState([]);

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

    return (
        <div>
        <div>
            Search for Recipes here!
            <MainList recipes={recipes} />
        </div>
        <Link to="/mycookbook"><button>Go to Cookbook</button></Link>
        </div>
        
    );
};

export default Main;