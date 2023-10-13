import { addNewRecipe } from "../../Common/Services/CookbookService";

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
                        <div>
                            <li key={recipe.id}>
                                {" "}
                                {recipe.id} | {recipe.get("name")}{" "}
                            </li>
                            <button onClick={()=>addNewRecipe(recipe, cookbooks)}>Add to Cookbook</button>
                        </div>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default RecipeList;