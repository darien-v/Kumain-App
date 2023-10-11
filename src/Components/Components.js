//Import all modules to route to
import Main from "./Main/Main";
//Import react router to map location to components
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//We could use this in conjunction with a navbar 
export default function Components() {
    return(
        <Router>
            <Routes>
                <Route path="Recipes" element={<Main />}/>
            </Routes>
        </Router>
    )
}