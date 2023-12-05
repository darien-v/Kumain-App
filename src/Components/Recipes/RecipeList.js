import { addNewRecipe } from "../../Common/Services/CookbookService";
import "./Recipes.css";

const RecipeList = ({ recipes, cookbooks }) => {
    return (
        <div>
            <hr />
            Here is where all the recipes will be listed
            <div>
                <p>Recipes: </p>
                {recipes.length > 0 && (
                    <ul>
                        {recipes.map((recipe) => (
                        <div className="recipe-column">
                            <div className="recipe-row">
                                <div className="recipe-card">
                                    <h6><b>{recipe.get("name")}{" "}</b></h6>
                                    <br />
                                    <p><b>Ingredients:</b> {recipe.get("Ingredients")}</p>
                                    <p><b>Servings: </b> {recipe.get("Servings")}</p>
                                    <a href={recipe.get("Link")} target="_blank">Find it Here!</a>
                                    <br />
                                    <button onClick={()=>addNewRecipe(recipe, cookbooks)}>Add to Cookbook</button>
                                </div>
                            </div>
                        </div>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default RecipeList;