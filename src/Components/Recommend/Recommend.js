import { useState } from "react";
import { addNewRecipe } from "../../Common/Services/CookbookService";
import "./Recommend.css";
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Recommend = ({ cookbooks, yourRecipes, allRecipes, show }) => {
	const [startRec, setStartRec] = useState(0);
	const [endRec, setEndRec] = useState(4);

	const recommendations = {};
	yourRecipes.map((yourRecipe) => {
		allRecipes.map((allRecipe) => {
			// give every recipe not in cookbook 1 point for consideration
			if (yourRecipe.get("name") !== allRecipe.get("name")) {
				if (!(allRecipe.get("name") in recommendations) && (allRecipe !== yourRecipe)) {
					recommendations[allRecipe.get("name")] = 1;
					// give every recipe of same origin 2 extra points
					if (yourRecipe.get("Origin") === allRecipe.get("Origin")) {
						recommendations[allRecipe.get("name")] += 2;
						// differentiate some dishes over others in the same origin
					}
					// consider doing similar ingredients
					// find other ways to add points so that it is not only same origins that keep popping up
					yourRecipe.get("Ingredients").map((yourIngredient) => {
						allRecipe.get("Ingredients").map((allIngredient) => {
							// if ingredients are the same then add points
							if (yourIngredient == allIngredient) {
								recommendations[allRecipe.get("name")] += 1;
							}
						})
					})

				}
			}
		})
	});
	var recs = Object.keys(recommendations);
	recs.sort();
	console.log(recs);
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
	const refresh = () => {
		// need to set limit on end recs and then re update to the beginning when it shows the last
		setStartRec(startRec+show);
		setEndRec(endRec+show);
	}
	const showMore = () => {
		setEndRec(endRec+show);
	}
	return (
		<Container>
			{allRecs.length > 0 && (
				<div>
					{(show === 4) && (
					<div>
						<button className="refresh" onClick={()=>refresh()} >
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" 
							class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
							<path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
							<path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
						</svg>
						{" "}Refresh
						</button>
						<Link to="/recommend">
							<button className="see-all" >
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" 
								class="bi bi-grid-3x3-gap" viewBox="0 0 16 16">
  									<path d="M4 2v2H2V2zm1 12v-2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1m0-5V7a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1m0-5V2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1m5 10v-2a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1m0-5V7a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1m0-5V2a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1M9 2v2H7V2zm5 0v2h-2V2zM4 7v2H2V7zm5 0v2H7V7zm5 0h-2v2h2zM4 12v2H2v-2zm5 0v2H7v-2zm5 0v2h-2v-2zM12 1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zm-1 6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zm1 4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1z"/>
								</svg>
								{" "}See All
							</button>
						</Link>
					</div>
					)}
					<Row>
                        {allRecs.slice(startRec, endRec).map((recipe) => (
                            <Col md={3}>
                                <div className="recipe-card">
                                    <h6><b>{recipe.get("name")}{" "}</b></h6>
									{recipe.get("ImageURL") && (
                                		<img src={recipe.get("ImageURL")} height="200px" width="250px"></img>
                            		)}
                                    <br />
									<br />
                                    <p><b>Ingredients:</b> {recipe.get("Ingredients").map((rec, idx) => {
                                		return (idx === recipe.get("Ingredients").length -1) ? rec : rec + ", "
                            		})}</p>
                                    <p><b>Servings: </b> {recipe.get("Servings")}</p>
                                    <a href={recipe.get("Link")} target="_blank">Find it Here!</a>
                                    <br />
                                    <button onClick={()=>addNewRecipe(recipe, cookbooks)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                                </svg>
                                {" Add to Cookbook"}</button>
                                </div>
                            </Col>
						))}
                    </Row>
				</div>
                )}
				{(show === 12) && (
						<button className="refresh" onClick={()=>showMore()} >
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" 
							class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
							<path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
							<path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
							</svg>
							{" "}Show More
						</button>
				)}
		</Container>
	);
};

export default Recommend;