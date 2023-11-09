import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { checkUserName } from "../../Common/Services/AuthService";
//import checkUser function here

const ProtectedRoute = ({ element: Component,...rest }) => {
    console.log("element: ", Component);
    const username = useParams();
    console.log("url username: ", username.username);
    //how can we get
    const navigate = useNavigate();
    if (checkUserName(username.username)) {
        return <Component />;
    } else {
        alert("You do not have access to this page");
        navigate("/login");
        //react sees false as a null component, but not null as a null component????
        return false;
    }
  };
  
export default ProtectedRoute;

