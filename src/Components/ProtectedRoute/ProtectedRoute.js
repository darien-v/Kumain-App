import React from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { checkUser } from "../../Common/Services/AuthService";
//import checkUser function here

const ProtectedRoute = ({ element: Component,...rest }) => {
    console.log("element: ", Component);
    const username = useParams();
    console.log("url username: ", username.username);
    //how can we get protected routes to verify the user is on the right personal page? for the future maybe
    //const navigate = useNavigate();
    if (checkUser()) {
        return <Component />;
        //<Navigate to={rest.path} replace />
    } else {
        alert("You do not have access to this page");
        //navigate("/login");
        //react sees false as a null component, but not null as a null component????
        return <Navigate to="/login" replace/>;
    }
  };
  
export default ProtectedRoute;

