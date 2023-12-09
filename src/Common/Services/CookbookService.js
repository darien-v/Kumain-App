import { objectTypeSpreadProperty } from "@babel/types";
import Parse from "parse";

export let Cookbooks = {};
Cookbooks.collection = [];

export const getCookbooks = (user) => {
	console.log("current user: ", user);
    const Cookbook = Parse.Object.extend("Cookbook");
    const query = new Parse.Query(Cookbook);
	query.equalTo("User", user);
    return query.find().then((results) => {
        console.log("results: ", results);
        if (results.length == 0) {
			// if there is not existing cookbook
			// then we will create a new one for the user
			const cookbook = new Parse.Object("Cookbook");
			if (user) {
				const nameString = user.get("firstName");
				cookbook.set("name", `${nameString}'s Cookbook`);
				cookbook.set("User", user);
				console.log("Cookbook: ", cookbook)
			}
			try {
				let result = cookbook.save()
				results.push(result);
				return results;
			} catch(error) {
				alert("Error: ", error);
			}
		}
		return results;
    })
}

export const getRecipesFromCookbook = async (cookbooks) => {
	// right now works as passing in cookbooks as array and limiting to one cookbook; subject to change
	const Recipe = Parse.Object.extend("Recipe");
	const query = new Parse.Query(Recipe);
	var relation = cookbooks.relation("recipes");
	return relation.query().find().then((results) => {
		console.log("results :", results);
		return results;
	});
	// console.log("this is your recipes: ", recipes);
	// return query.find().then((results) => {
	// 	console.log("your recipes: ", results);
	// 	return results;
	// })
}

export const removeRecipesFromCookbook = async (recipe, cookbooks) => {
	const cookbook = cookbooks[0];
	const Recipe = Parse.Object.extend("Recipe");
	const query = new Parse.Query(Recipe);
	return query.get(recipe.id).then( async (object) => {
		var relation = cookbook.relation("recipes");
		relation.remove(object)
		await cookbook.save()
	})
}

// ADD IN CHECK TO DENY ADDING RECIPE TO COOKBOOK TWICE
export const addNewRecipe = async (Recipe, cookbooks) => {
	// right now limiting users to add to one cookbook
	// could rework this to give each user one "selected" cookbook
	// so that they can add different recipes to multiple different cookbooks
	const cookbook = cookbooks[0];
	const recipe = Parse.Object.extend("Recipe");
	const query2 = new Parse.Query(recipe);
	return query2.get(Recipe.id).then( async (object) => {
		var relation = cookbook.relation("recipes");
		relation.add(object);
		await cookbook.save()
	});
}

// IMPLEMENT DELETE FROM COOKBOOK FUNCTION