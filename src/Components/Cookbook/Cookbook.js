import React, { useState, useEffect } from "react";
import { getCookbooks, getRecipesFromCookbook, Cookbooks } from "../../Common/Services/CookbookService";
import CookbookList from "./CookbookList"
import { Link } from "react-router-dom";

const Cookbook = () => {
    const [cookbooks, setCookbooks] = useState([]);

	const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        if (Cookbooks.collection.length){
            setCookbooks(Cookbooks.collection);
        } else{
            getCookbooks().then((cookbooks) => {
                console.log(cookbooks);
                setCookbooks(cookbooks);
				// grabbing cookbook item and then passing it into the get recipes function
				getRecipesFromCookbook(cookbooks[0]).then((recipes) => {
					setRecipes(recipes);
				})
            });
        }
    }, []);

    return (
		<div>
        <div>
            Welcome to your Cookbook!
            <CookbookList recipes={recipes} cookbooks={cookbooks} />
        </div>
		<Link to="/recipes"><button>Search more recipes!</button></Link>
		</div>
    );
};

export default Cookbook;