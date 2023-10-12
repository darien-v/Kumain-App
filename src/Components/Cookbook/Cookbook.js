import React, { useState, useEffect } from "react";
import { getCookbook, Cookbooks } from "../../Common/Services/CookbookService";
import CookbookList from "./CookbookList.js";
import { Link } from "react-router-dom";

const Cookbook = () => {
    const [cookbooks, setCookbooks] = useState([]);

    useEffect(() => {
        if (Cookbooks.collection.length){
            setCookbooks(Cookbooks.collection);
        } else{
            getCookbook().then((cookbooks) => {
                console.log(cookbooks);
                setCookbooks(cookbooks)
            });
        }
    }, []);

    return (
		<div>
        <div>
            Welcome to your Cookbook!
            <CookbookList recipes={cookbooks} />
        </div>
		<Link to="/"><button>Search more recipes!</button></Link>
		</div>
    );
};

export default Cookbook;