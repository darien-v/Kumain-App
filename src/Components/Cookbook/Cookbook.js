import React, { useState, useEffect } from "react";
import { getCookbooks, getRecipesFromCookbook, Cookbooks } from "../../Common/Services/CookbookService";
import CookbookList from "./CookbookList"
import { Link } from "react-router-dom";
import { getCurrentUser } from "../../Common/Services/AuthService";
//Once the authentication stuff is done, let's start linking cookbooks to user profiles, and have them on a protected route
const Cookbook = () => {
    const [cookbooks, setCookbooks] = useState([]);

	const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        if (Cookbooks.collection.length){
            setCookbooks(Cookbooks.collection);
        } else{
            const user = getCurrentUser();
            if (user) {
                getCookbooks(user).then((cookbooks) => {
                    console.log("Cookbook: ", cookbooks);
                    setCookbooks(cookbooks);
			    	// grabbing cookbook item and then passing it into the get recipes function
			    	getRecipesFromCookbook(cookbooks[0]).then((recipes) => {
			    		setRecipes(recipes);
			    	})
                })
            }
        }
    }, []);

    return (
		<div>
        <div>
            Welcome to your Cookbook!
            <CookbookList recipes={recipes} cookbooks={cookbooks} />
        </div>
        <div className="cookbook-btn">
		<Link to="/recipes"><button>Search more recipes!</button></Link>
		</div>
        </div>
    );
};

export default Cookbook;