//Import all modules to route to
import Recipe from "./Recipes/Recipe";
import Home from "./Home/Home"
import Header from "./Header/Header";
import Cookbook from "./Cookbook/Cookbook";
import AuthRegister from "./Auth/AuthRegister";
import AuthLogin from "./Auth/AuthLogin";
//Import react router to map location to components
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import RecommendTab from "./Recommend/RecommendTab";

//We could use this in conjunction with a navbar 
export default function Components() {
    return(
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/register" element={<AuthRegister />} />
                <Route path="/login" element={<AuthLogin />} />
                <Route path="/recipes" element={<Recipe />} />
                <Route path="/mycookbook" element={<Cookbook />} />
                <Route path="/recommend" element={<RecommendTab />} />
                <Route path="/:username/home" element={<ProtectedRoute path='/:username/home' element={Home}/>}/>
            </Routes>
        </Router>
    )
}