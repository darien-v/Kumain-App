import { addNewRecipe, removeRecipesFromCookbook, getCookbooks, getRecipesFromCookbook, Cookbooks } from "../../Common/Services/CookbookService";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, useNavigate } from "react-router-dom";

const RecipeList = ({ recipes, cookbooks }) => {
	const [startRec, setStartRec] = useState(0);
	const [endRec, setEndRec] = useState(9);

	const showMore = () => {
		setEndRec(endRec+9);
	}

    const removeRecipe = (recipe, cookbooks) => {
        removeRecipesFromCookbook(recipe, cookbooks);
    }

    const addRecipe = (e, recipe, cookbooks) => {
        addNewRecipe(recipe, cookbooks);
    }

    return (
        <div>
            <hr />
            Here is where all the recipes will be listed
            <Container>
            {recipes.length > 0 && (
                <Row>
                {recipes.slice(startRec, endRec).map((recipe) => (
                    <Col md={4}>
                        <div className={"recipe-card"}>
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
                            {recipe.get("inCookbook") === false && (
                            <button onClick={(e)=>addRecipe(e, recipe, cookbooks)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                                </svg>
                                {" Add to Cookbook"}
                            </button>
                            )}
                            {recipe.get("inCookbook") && (
                                <button onClick={()=>removeRecipe(recipe, cookbooks)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                </svg>
                                    {" Remove from Cookbook"}
                                </button>
                            )}

                        </div>
                    </Col>
                ))}
                </Row>
            )}
            <button className="refresh" onClick={()=>showMore()} >
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" 
					class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
					<path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
					<path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
				</svg>
				{" "}Show More
			</button>
            <Link to="/mycookbook">
                <button className="see-all">Go to Cookbook</button>
            </Link>
            
            </Container>
        </div>
    );
};

export default RecipeList;