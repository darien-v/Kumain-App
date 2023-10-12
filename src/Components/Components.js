//Import all modules to route to
import Main from "./Main/Main";
import Home from "./Home/Home"
import Header from "./Header/Header";
import Cookbook from "./Cookbook/Cookbook";
//Import react router to map location to components
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//We could use this in conjunction with a navbar 
export default function Components() {
    return(
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/recipes" element={<Main />} />
                <Route path="/mycookbook" element={<Cookbook />} />
            </Routes>
        </Router>
    )
}