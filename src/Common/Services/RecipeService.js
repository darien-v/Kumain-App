import Parse from "parse"

export let Recipes = {};
Recipes.collection = [];

//Right now, recipes can only be viewed as a whole, the next step is to create a search component to
//filter out recipes, and another component to create new recipes (If they're not identical to another)
export const getAllRecipes = () => {
    const Recipe = Parse.Object.extend("Recipe");
    const query = new Parse.Query(Recipe);
    return query.find().then((results) => {
        console.log("results: ", results);
        return results;
    });
};

export const getSearchParams = () => {
    const query = new Parse.Query("Recipe")
    return query.find().then((results) => {
        var ingredientsArray, prepArray, cookArray, servingArray = []
        
        for (var i=0;i<= results.length-1; i++){
            ingredientsArray.append(results[i].get("Ingredients"))
            prepArray.append(results[i].get("PrepTime"))
            cookArray.append(results[i].get("CookTime"))
            servingArray.append(results[i].get("Servings"))
        }
        var ingredients = [...new Set(ingredientsArray.flat(1))];
        return [ingredients, Math.min(prepArray), Math.max(prepArray), Math.min(cookArray), Math.max(cookArray), Math.min(servingArray), Math.max(servingArray)]
    });
}

export const getSearchResults = (ingredientsList, minCook, maxCook, minPrep, maxPrep, minServe, maxServe) => {
    const query = new Parse.Query("Recipe")
    
}