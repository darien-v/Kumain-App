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
        var ingredientsArray =[]
        var prepArray = [] 
        var cookArray = []
        var servingArray = []
        var cuisineArray = []
        
        for (var i=0;i<= results.length-1; i++){
            if (results[i].get("Ingredients")){
                ingredientsArray.push(results[i].get("Ingredients"))
            }
            if (results[i].get("PrepTime")){
                prepArray.push(results[i].get("PrepTime"))
            }
            if (results[i].get("CookTime")){
                cookArray.push(results[i].get("CookTime"))
            }
            if (results[i].get("Servings")){
                servingArray.push(results[i].get("Servings"))
            }
            if (results[i].get("Origin")){
                cuisineArray.push(results[i].get("Origin"))
            }
        }
        var ingredients = [...new Set(ingredientsArray.flat(1))];
        var cuisineList = [...new Set(cuisineArray)]
        console.log(cuisineList)
        prepArray = prepArray.filter(value => typeof value === 'number');
        cookArray = cookArray.filter(value => typeof value === 'number');
        servingArray = servingArray.filter(value => typeof value === 'number');
        console.log(prepArray)
        console.log(cookArray)
        console.log(servingArray)
        var minPrep = prepArray.length > 0 ? Math.min(...prepArray) : undefined;
        var maxPrep = prepArray.length > 0 ? Math.max(...prepArray) : undefined;
        var minCook = cookArray.length > 0 ? Math.min(...cookArray) : undefined;
        var maxCook = cookArray.length > 0 ? Math.max(...cookArray) : undefined;
        var minServing = servingArray.length > 0 ? Math.min(...servingArray) : undefined;
        var maxServing = servingArray.length > 0 ? Math.max(...servingArray) : undefined;

        return [ingredients, minPrep, maxPrep, minCook, maxCook, minServing, maxServing, cuisineList];
        //return [ingredients, Math.min(prepArray), Math.max(prepArray), Math.min(cookArray), Math.max(cookArray), Math.min(servingArray), Math.max(servingArray), cuisineList]
    });
}

export const getSearchResults = (ingredientsList, minCook, maxCook, minPrep, maxPrep, minServe, maxServe) => {
    const query = new Parse.Query("Recipe")
    
}