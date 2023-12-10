import React, { useState, useEffect } from "react";
import { getAllRecipes, Recipes } from "../../Common/Services/RecipeService";
import { getCookbooks, Cookbooks } from "../../Common/Services/CookbookService";
import RecipeList from "./RecipeList";
import { Link } from "react-router-dom";
import "./Recipes.css";
import SearchForm from "../Search/SearchForm"
import { getSearchParams, getSearchResults } from "../../Common/Services/RecipeService";
import { getCurrentUser } from "../../Common/Services/AuthService";

const Recipe = () => {
    const [recipes, setRecipes] = useState([]);

    const [cookbooks, setCookbooks] = useState([]);

    const [ingredients, setIngredients] = useState([]);
    const [minCook, setMinCook] = useState(0);
    const [maxCook, setMaxCook] = useState(0);
    const [minPrep, setMinPrep] = useState(0);
    const [maxPrep, setMaxPrep] = useState(0);
    const [minServings, setMinServings] = useState(0);
    const [maxServings, setMaxServings] = useState(0);
    const [cuisineList, setCuisineList] = useState([]);

    const [searchParams, setSearchParams] = useState({
        selectedIngredients: [],
        selectedCuisine: [],
        prepTime: 0,
        cookTime: 0,
        servings: 0,
    });

    const handleSearchParamsChange = (newSearchParams) => {
        setSearchParams(newSearchParams);
    };
    
    const handleSearch = () => {
        handleSearchParamsChange(searchParams)
        // Access the selected values from searchParams
        console.log('Selected Ingredients:', searchParams.selectedIngredients);
        console.log('Selected Cuisine:', searchParams.selectedCuisine);
        console.log('Prep Time:', searchParams.prepTime);
        console.log('Cook Time:', searchParams.cookTime);
        console.log('Servings:', searchParams.servings);
        // Perform further actions with the selected values
        getSearchResults(searchParams).then((recipes) => {
            setRecipes(recipes)
        })
    };

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
                <SearchForm ingredients={ingredients} minCook={minCook} maxCook={maxCook} minPrep={minPrep} maxPrep={maxPrep} minServings={minServings} maxServings={maxServings} cuisineList={cuisineList} onSearchParamsChange={handleSearchParamsChange} searchFunc = {handleSearch}/>
                <button type="button" onClick={handleSearch}>Search</button>
                <RecipeList recipes={recipes} cookbooks={cookbooks} />
            </div>
        </div>
        
    );
};

export default Recipe;