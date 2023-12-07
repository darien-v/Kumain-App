import { removeRecipesFromCookbook } from "../../Common/Services/CookbookService";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

//Initially was going to reuse recipeList component, but realized cookbook needs extra elements
//to provide more fidelity with adding and removing recipes
//Recipe list is a list of all recipes sitewide, where people can only create recipes, but cookbook is
//a collection of recipes curated by someone, and needs to allow adding and removing objects
const CookbookList = ({ recipes, cookbooks }) => {
    return (
        <div>
            <hr />
            Here are your recipes!
            <Container>
                {recipes.length > 0 && (
                    <div>
                        <p>Recipes: </p>
                    <Row>
                    {recipes.map((recipe) => (
                        <Col md={4}>
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
                                <button onClick={()=>removeRecipesFromCookbook(recipe, cookbooks)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                </svg>
                                    {" Remove from Cookbook"}
                                </button>
                            </div>
                        </Col>
                    ))}
                    </Row>
                    </div>
                )} 
            </Container>
        </div>
    );
};

export default CookbookList;