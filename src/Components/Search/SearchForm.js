import Select from 'react-select';
//import { RangeSlider } from "react-double-range-slider";
import { useState } from 'react';
//import ReactSlider from 'react-slider'
//import "https://cdnjs.cloudflare.com/ajax/libs/rangeslider.js/2.3.2/rangeslider.css"
//import "react-double-range-slider/dist/cjs/index.css";
import "./Search.css";
import MultiRangeSlider from "multi-range-slider-react";
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
    const ingredientsDict = ingredients.map(item => ({
        label: item,
        value: item
      }));
    const cuisineDict = cuisineList.map(item => ({
        label: item,
        value: item
      }));
    return (
        <div className="search">
            <h1>Search for recipes</h1>
            <h5>Looking for recipes? Our handy search tool can find recipes from the ingredients you have!</h5>
            <h4>Ingredients</h4>
            <Select
                options = {ingredientsDict}
                isMulti
                isClearable = {true}
                isSearchable = {true}
            />
            <h4>Cuisine Types</h4>
            <Select 
                options = {cuisineDict}
                isMulti
                isClearable = {true}
                isSearchable = {true}
            />
            <h4>Prep Time</h4>
            {/*
            <div className="slidecontainer">
                <input type="range" min="1" max="100" value="50"/>
            </div>
            */}
            <MultiRangeSlider
                onInput = {handleValueChange}
                min= {minPrep}
                max={maxPrep}
                label={true}
                step={1}
            />
            <h4>Cook Time</h4>
            <MultiRangeSlider
                onInput = {handleValueChange}
                min= {minCook}
                max={maxCook}
                label={true}
                step={1}
            />
            <h4>Serving Size</h4>
            <MultiRangeSlider
                onInput = {handleValueChange}
                min= {minServings}
                max={maxServings}
                label={true}
                step={1}
            />
        </div>
    )
}

export default SearchForm;