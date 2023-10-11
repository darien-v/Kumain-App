const MainList = ({ recipes }) => {
    return (
        <div>
            <hr />
            Here is where all the recipes will be listed
            <div>
                <p>Recipes: </p>
                {recipes.length > 0 && (
                    <ul>
                        {recipes.map((recipe) => (
                            <li key={recipe.id}>
                                {" "}
                                {recipe.id} | {recipe.get("name")}{" "}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default MainList;