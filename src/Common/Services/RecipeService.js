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