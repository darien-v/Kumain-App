const CookbookList = ({ recipes }) => {
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
							{/* still need to add in functionality to delete */}
                            <button>Remove from Cookbook</button>
                        </div>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default CookbookList;