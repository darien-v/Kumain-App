import Select from 'react-select'
import { RangeSlider } from "react-double-range-slider";
import ReactSlider from 'react-slider'
import "react-double-range-slider/dist/cjs/index.css";
//assume ingredients is a list of unique ingredients taken from backend
//minCook and maxCook also taken from backend
//same with minPrep and maxPrep
const SearchForm = ({ingredients, minCook, maxCook, minPrep, maxPrep, minServings, maxServings, cuisineList}) => {
    return (
        <div>
            <h1>Search for recipes</h1>
            <h3>Looking for recipes? Our handy search tool can find recipes from the ingredients you have!</h3>
            <h2>Ingredients</h2>
            <Select 
                options = {ingredients}
                isMulti
                isClearable = {true}
                isSearchable = {true}
            />
            <h2>Cuisine Types</h2>
            <Select 
                options = {cuisneList}
                isMulti
                isClearable = {true}
                isSearchable = {true}
            />
            <h2>Prep Time</h2>
            <RangeSlider
                value = {{min: minPrep, max: maxPrep}}
                tooltipPosition='over'
                tooltipVisibility='always'
            />
            <h2>Cook Time</h2>
            <RangeSlider
                value = {{min: minCook, max: maxCook}}
                tooltipPosition='over'
                tooltipVisibility='always'
            />
            <h2>Serving Size</h2>
            <RangeSlider
                value = {{min: minServings, max: maxServings}}
                tooltipPosition='over'
                tooltipVisibility='always'
            />
        </div>
    )
}