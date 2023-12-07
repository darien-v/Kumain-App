import { objectTypeSpreadProperty } from "@babel/types";
import Parse from "parse";

export let Cookbooks = {};
Cookbooks.collection = [];

export const getCookbooks = () => {
    const Cookbook = Parse.Object.extend("Cookbook");
    const query = new Parse.Query(Cookbook);
    return query.find().then((results) => {
        console.log("results: ", results);
        return results;
    })
}

export const getRecipesFromCookbook = async (cookbooks) => {
	// right now works as passing in cookbooks as array and limiting to one cookbook; subject to change
	const Recipe = Parse.Object.extend("Recipe");
	const query = new Parse.Query(Recipe);
	query.equalTo("cookbook", cookbooks);
	return query.find().then((results) => {
		console.log("your recipes: ", results);
		return results;
	})
}

export const removeRecipesFromCookbook = async (recipe, cookbooks) => {
	const Recipe = Parse.Object.extend("Recipe");
	const query = new Parse.Query(Recipe);
	return query.get(recipe.id).then( async (object) => {
		// using a variable to determine if in cookbook now
		object.set("inCookbook", false);
		var relation = object.relation("cookbook");
		relation.remove(cookbooks[0])
		await object.save()
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
		// using a variable to determine if in cookbook for now
		object.set("inCookbook", true);
		var relation = object.relation("cookbook");
		relation.add(cookbook);
		await object.save()
	});
}

// IMPLEMENT DELETE FROM COOKBOOK FUNCTION