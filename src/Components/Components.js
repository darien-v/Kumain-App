//Import all modules to route to
import Main from "./Main/Main";
import Header from "./Header/Header";
//Import react router to map location to components
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//We could use this in conjunction with a navbar 
export default function Components() {
    return(
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Main />}/>
            </Routes>
        </Router>
    )
}