import Select from 'react-select';
import { RangeSlider } from "react-double-range-slider";
import { useState } from 'react';
import ReactSlider from 'react-slider'
import "react-double-range-slider/dist/cjs/index.css";
import "./Search.css"
//assume ingredients is a list of unique ingredients taken from backend
//minCook and maxCook also taken from backend
//same with minPrep and maxPrep
const SearchForm = ({ingredients, minCook, maxCook, minPrep, maxPrep, minServings, maxServings, cuisineList}) => {
    const [cookTime, setCookTime] = useState(minCook);
    const [prepTime, setPrepTime] = useState(minPrep);
    const [servings, setServings] =useState(minServings);

    const handleValueChange = (e) => {
        console.log(e.target)
    }

    return (
        <div className="search">
            <h1>Search for recipes</h1>
            <h5>Looking for recipes? Our handy search tool can find recipes from the ingredients you have!</h5>
            <h4>Ingredients</h4>
            <Select
                options = {ingredients}
                isMulti
                isClearable = {true}
                isSearchable = {true}
            />
            <h4>Cuisine Types</h4>
            <Select 
                options = {cuisineList}
                isMulti
                isClearable = {true}
                isSearchable = {true}
            />
            <h4>Prep Time</h4>
            <div className="slidecontainer">
                <input type="range" min="1" max="100" value="50"/>
            </div>
            {/* <RangeSlider
                onValueChanged = {handleValueChange}
                start={minPrep}
                end={maxPrep}
                tooltipPosition='over'
                tooltipVisibility='always'
            /> */}
            <h4>Cook Time</h4>
            <div className="slidecontainer">
                <input type="range" min="1" max="100" value="50" />
            </div>
            {/* <RangeSlider
                onValueChanged = {handleValueChange}
                start={minCook}
                end={maxCook}
                tooltipPosition='over'
                tooltipVisibility='always'
            /> */}
            <h4>Serving Size</h4>
            <div className="slidecontainer">
                <input type="range" min="1" max="100" value="50" />
            </div>
            {/* <RangeSlider
                onValueChanged = {handleValueChange}
                start={minServings}
                end={maxServings}
                tooltipPosition='over'
                tooltipVisibility='always'
            /> */}
        </div>
    )
}

export default SearchForm;