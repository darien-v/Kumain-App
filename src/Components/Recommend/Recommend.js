import { addNewRecipe } from "../../Common/Services/CookbookService";
import "./Recommend.css";
import 'bootstrap/dist/css/bootstrap.css';

const Recommend = ({ cookbooks, yourRecipes, allRecipes }) => {
	const recommendations = {};
	yourRecipes.map((yourRecipe) => {
		allRecipes.map((allRecipe) => {
			// give every recipe not in cookbook 1 point for consideration
			if (yourRecipe.get("name") !== allRecipe.get("name")) {
				if (!(allRecipe.get("name") in recommendations)) {
					recommendations[allRecipe.get("name")] = 1;
					// give every recipe of same origin 2 extra points
					if (yourRecipe.get("Origin") === allRecipe.get("Origin")) {
						recommendations[allRecipe.get("name")] += 2;
						// differentiate some dishes over others in the same origin
					}
					// consider doing similar ingredients
					// find other ways to add points so that it is not only same origins that keep popping up
				}
			}
		})
	});
	var recs = Object.keys(recommendations);
	recs.sort();
	const allRecs = [];
	allRecipes.map((recipe) => {
		recs.map((rec) => {
			if (recipe.get("name") === rec) {
				allRecs.push(recipe);
			}
		})
	});
	console.log(allRecs);
	// we will limit only showing four at a time
	// doesnt work rn prob have to useEffect 
	// shows first four want refresh button to continuously show next four
	var currentFour = allRecs.slice(0, 4);
	var click = 0;
	console.log(currentFour);
	// need to fix
	const refresh = (click, allRecs) => {
		click += 4
		allRecs = allRecs.slice(click, click+4)
	}
	return (
		<div>
			{currentFour.length > 0 && (
				<div>
					<button className="refresh" onClick={()=>refresh(click, allRecs)} >
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" 
					class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
						<path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
						<path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
						</svg>
					{" "}Refresh</button>
                    <ul>
                        {currentFour.map((rec) => (
                        <div className="recipe-column">
                            <div className="recipe-row">
                                <div className="recipe-card">
                                    <h6><b>{rec.get("name")}{" "}</b></h6>
                                    <br />
                                    <p><b>Ingredients:</b> {rec.get("Ingredients")}</p>
                                    <p><b>Servings: </b> {rec.get("Servings")}</p>
                                    <a href={rec.get("Link")} target="_blank">Find it Here!</a>
                                    <br />
                                    <button onClick={()=>addNewRecipe(rec, cookbooks)}>Add to Cookbook</button>
                                </div>
                            </div>
                        </div>
                        ))}
                    </ul>
				</div>
                )}
		</div>
	);
};

export default Recommend;