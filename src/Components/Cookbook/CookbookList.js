import { removeRecipesFromCookbook } from "../../Common/Services/CookbookService";

//Initially was going to reuse recipeList component, but realized cookbook needs extra elements
//to provide more fidelity with adding and removing recipes
//Recipe list is a list of all recipes sitewide, where people can only create recipes, but cookbook is
//a collection of recipes curated by someone, and needs to allow adding and removing objects
const CookbookList = ({ recipes, cookbooks }) => {
    return (
        <div>
            <hr />
            Here are your recipes!
            <div>
                <p>Recipes: </p>
                {recipes.length > 0 && (
                    <ul id="cookbookList">
                        {recipes.map((recipe) => (
                        <div>
                            <li key={recipe.id}>
                                {" "}
                                {recipe.id} | {recipe.get("name")}{" "}
                            </li>
							{/* need to update list when deleted; needs a refresh */}
                            <button onClick={()=>removeRecipesFromCookbook(recipe, cookbooks)}>Remove from Cookbook</button>
                        </div>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default CookbookList;