import Parse from "parse";

export let Cookbooks = {};
Cookbooks.collection = [];

export const getCookbook = () => {
    const Cookbook = Parse.Object.extend("Cookbook");
    const query = new Parse.Query(Cookbook);
    return query.find().then((results) => {
        console.log("results: ", results);
        return results;
    })
}

export const addNewRecipe = async (Recipe) => {
    const Cookbook = new Parse.Object("Cookbook");
    Cookbook.set("recipe", Recipe);
    await Cookbook.save();
    console.log(Cookbook);
}