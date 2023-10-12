//Import all modules to route to
import Main from "./Main/Main";
import Cookbook from "./Cookbook/Cookbook";
//Import react router to map location to components
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//We could use this in conjunction with a navbar 
export default function Components() {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Main />}/>
                <Route path="/mycookbook" element={<Cookbook />} />
            </Routes>
        </Router>
    )
}