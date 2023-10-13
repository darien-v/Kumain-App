import { removeRecipesFromCookbook } from "../../Common/Services/CookbookService";

const CookbookList = ({ recipes, cookbooks }) => {
    return (
        <div>
            <hr />
            Here are your recipes!
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