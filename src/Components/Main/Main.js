import React, { useState, useEffect } from "react";
import { getAllRecipes, Recipes } from "../../Common/Services/RecipeService";
import MainList from "./MainList";

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
            Search for Recipes here!
            <MainList recipes={recipes} />
        </div>
    );
};

export default Main;