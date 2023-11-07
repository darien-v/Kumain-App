import React from "react";
import { useNavigate } from "react-router-dom";
//import checkUser function here

const ProtectedRoute = ({ element: Component, ...rest }) => {
    console.log("element: ", Component);
    const navigate = useNavigate();
    const goBackHandler = () => {
      navigate("/auth");
    };
    if (/*insert checkUser func here*/True) {
      return <Component />;
    } else {
      
        /*
        (
        <div>
          <p>Unauthorized!</p> <button onClick={goBackHandler}>Go Back.</button>
        </div>
        );
        */
       //once these components are made, lets see if there's any way for us to modify the auth component to read a message like "to access this feature, you must log in or sign up"
       navigate("/auth");
       return
    }
  };
  
  export default ProtectedRoute;

