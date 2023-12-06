import { addNewRecipe } from "../../Common/Services/CookbookService";
import "./Recipes.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const RecipeList = ({ recipes, cookbooks }) => {
    return (
        <div>
            <hr />
            Here is where all the recipes will be listed
            <Container>
            {recipes.length > 0 && (
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
                            <button onClick={()=>addNewRecipe(recipe, cookbooks)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                                </svg>
                                {" Add to Cookbook"}
                            </button>
                        </div>
                    </Col>
                ))}
                </Row>
            )}
            </Container>
        </div>
    );
};

export default RecipeList;