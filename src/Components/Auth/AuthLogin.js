import React, { useEffect, useState } from "react";
import { checkUser, doUserLogIn } from "../../Common/Services/AuthService.js";
import AuthForm from "./AuthForm";
import { useNavigate } from "react-router-dom";

const AuthLogin = () => {
  const [currentUser, setCurrentUser] = useState({
	email: "",
	password: ""
  });

  const navigate = useNavigate();

  const [add, setAdd] = useState(false);

  useEffect(() => {
	if (checkUser()) {
		alert("You are already logged in");
		navigate("/");
	}
  }, [navigate]);

  useEffect(() => {
    if (currentUser && add) {
      doUserLogIn(currentUser).then((userLoggedIn) => {
        if (userLoggedIn) {
          alert(
            `${userLoggedIn.get("firstName")}, you successfully logged in!`
          );
		  // redirecting to the protected route here throws a True is not defined error maybe something wrong with Protected Route
          //navigate(`/${userLoggedIn.get("username")}/mycookbook`);

        }
        // redirect user to main app
        setAdd(false);
        navigate("/:username/home")
      });
    }
  }, [navigate, currentUser, add]);

  const onChangeHandler = (e) => {
    e.preventDefault();
    console.log(e.target);
    const { name, value: newValue } = e.target;
    console.log(newValue);

    setCurrentUser({
      ...currentUser,
      [name]: newValue
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("submitted: ", e.target);
    setAdd(true);
  };

  return (
    <div>
      <AuthForm
        user={currentUser}
        onChange={onChangeHandler}
        onSubmit={onSubmitHandler}
        isRegister={false}
      />
    </div>
  );
};

export default AuthLogin;
