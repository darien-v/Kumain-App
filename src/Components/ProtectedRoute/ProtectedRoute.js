import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { checkUser } from "../../Common/Services/AuthService";
import Parse from "parse";
//import checkUser function here

const ProtectedRoute = ({ element: Component,...rest }) => {
    console.log("element: ", Component);
    const username = useParams();
    console.log("url username: ", username);
    //how can we get
    console.log("actual username: " )
    const navigate = useNavigate();
    if (checkUser()) {
        return <Component />;
    } else {
        navigate("/login");
        //react sees false as a null component, but not null as a null component????
        return false;
    }
  };
  
export default ProtectedRoute;

