import React, { useState, useEffect } from "react";
import { getAllRecipes, Recipes } from "../../Common/Services/RecipeService";
import { getCookbooks, Cookbooks } from "../../Common/Services/CookbookService";
import RecipeList from "./RecipeList";
import { Link } from "react-router-dom";
import "./Recipes.css";
import Search from "../Search/Search";
import { getCurrentUser } from "../../Common/Services/AuthService";

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
            const user = getCurrentUser();
            if (user) {
                getCookbooks(user).then((cookbooks) => {
                    console.log(cookbooks);
                    setCookbooks(cookbooks)
                });
            }
        }
    }, []);

    return (
        <div>
            <div>
                <Search />
                <RecipeList recipes={recipes} cookbooks={cookbooks} />
            </div>
        </div>
        
    );
};

export default Recipe;