import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { checkUser, getName } from "../../Common/Services/AuthService.js";
import { Cookbooks, getCookbooks, getRecipesFromCookbook } from "../../Common/Services/CookbookService";
import { Recipes, getAllRecipes } from "../../Common/Services/RecipeService.js"
// import Parse from "parse";
import 'bootstrap/dist/css/bootstrap.css';
import './Home.css';
import Recommend from "../Recommend/Recommend.js";
import { getCurrentUser } from "../../Common/Services/AuthService.js";

async function callScraper() {
  try {
    await fetch('http://localhost:3001/scrapeRecipes'); 
    console.log("successfully called scrape all recipes")
  } catch (error){
    console.log("error calling scrapeAllRecipes: ", error)
  }
}

export default function Home() {
    const [authenticated, setAuthenticated] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [recommendations, setRecommendations] = useState([]);
    const [cookbooks, setCookbooks] = useState([]);
	  const [recipes, setRecipes] = useState([]);
    const [allRecipes, setAllRecipes] = useState([]);

    useEffect(() => {
      callScraper()
        if (Cookbooks.collection.length){
            setCookbooks(Cookbooks.collection);
        } else{
            const user = getCurrentUser();
            if (user) {
              getCookbooks(user).then((cookbooks) => {
                setCookbooks(cookbooks);
				        // grabbing cookbook item and then passing it into the get recipes function
				        getRecipesFromCookbook(cookbooks[0]).then((recipes) => {
					        setRecipes(recipes);
				        })
            });
          }
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

    useEffect(() => {
      const fetchData = async () => {
        try {
          const name = await getName();
          setFirstName(name || ''); // Update state with the retrieved name
        } catch (error) {
          console.error('Error fetching name:', error);
        }
      };
      fetchData();
        if (checkUser()) {
            setAuthenticated(true);
        } else {
            setAuthenticated(false);
        }
      }, [authenticated]);
    
    return (
        <div>
        <section>
          <div className="front-page-banner">
            <h2>ku·ma·in</h2>
            <p>/kuˈmaʔin/</p>
            <p>verb</p>
            <p>to eat, nourish oneself with food</p>
            <p>"Kumain ka na ba?" or "Have you eaten?"</p>
          </div>
            <hr />
            <p className="summary-text">
            Kumain is cooking simplified. Want to learn how to cook a specific dish?
            Learn a new skill in the kitchen? Follow your favorite cooks and their
            recipes? Or just figure out what to cook with what you've got on hand?
            Kumain can do all that and more!
            </p>
            {/*I'd like to have the protected homepage show more than just a welcome message. Maybe recipe reccommendations?*/}
            {authenticated && (
            <div className="welcome">
              <h3>Welcome, {firstName}!</h3>
              {recipes.length <= 0 && (
                <div className="no-recipes">
                  <h5>Add some recipes to your cookbook so we can give you recommendations!</h5>
                  <Link to="/recipes">
                    <button class="btn btn-btn-outline-primary">Go to Recipes</button>
                  </Link>
                </div>
              )}
              {recipes.length > 0 && (
                <div>
                  <h5>Check out some recipes that we recommend based on you current tastes and styles!</h5>
                  <Recommend cookbooks={cookbooks} yourRecipes={recipes} allRecipes={allRecipes} show={4} /> 
                </div>
              )}
            </div>
            )}
            {/* dont allow users to register or login if they are already logged in */}
            {!authenticated && (
            <div className="authenticate">
                <Link to="/register">
                  <button class="btn btn-btn-outline-primary">Register</button>
                </Link>
                <Link to="/login">
                  <button class="btn btn-btn-outline-primary">Login</button>
                </Link>
            </div>
            )}
        </section>
      </div>
    );
}