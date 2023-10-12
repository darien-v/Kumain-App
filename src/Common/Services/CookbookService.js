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


// ADD IN CHECK TO DENY ADDING RECIPE TO COOKBOOK TWICE
export const addNewRecipe = async (Recipe) => {
    const Cookbook = Parse.Object.extend("Cookbook");
	const query = new Parse.Query(Cookbook);
    //Cookbook.set("cookbook", Recipe);
    //await Cookbook.save();
    console.log(query);
	const mycookbook = query.find().then((results) => {
		console.log(results[0]);
		return results[0];
	})
	// querying for the singular cookbook object, not sure if all users should be restricted to one or not
	// using that to pass in the query for the recipe to then set that as the pointer or fk for that class
	console.log(typeof(mycookbook));
	const recipe = Parse.Object.extend("Recipe");
	const query2 = new Parse.Query(recipe);
	const target_recipe = query2.get(Recipe.id).then( async (object) => {
		console.log(object);
		object.set("cookbook", mycookbook)
		await object.save()
	});
	console.log(target_recipe);
	// target_recipe.set("cookbook", mycookbook)
	// await target_recipe.save()
}

// IMPLEMENT DELETE FROM COOKBOOK FUNCTION