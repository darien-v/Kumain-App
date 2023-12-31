import React, { useEffect, useState } from "react";
import { createUser, checkUser } from "../../Common/Services/AuthService.js";
import AuthForm from "./AuthForm";
import { useNavigate } from "react-router-dom";

const AuthRegister = () => {
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  // flag is the state to watch for add/remove updates
  const [add, setAdd] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (checkUser()) {
      alert("You are already logged in");
      // not sure if u can even nav to register if already in but taking out :username
      navigate("/")
    }
    }, [navigate]);

  useEffect(() => {
    if (newUser && add) {
      createUser(newUser).then((userCreated) => {
        if (userCreated) {
          alert(
            `${userCreated.get("firstName")}, you successfully registered!`
          );
          // we should navigate to authenticated user page because when registering and then going to login
          // it throws an error saying you are already logged in because the cookies of the registered user get
          // added to the localStorage. You have to manually delete local Storage and then login after register
          //navigate("/login");
          navigate(`/${userCreated.get("firstName")}/home`);
          // force reload to update header
          navigate(0);
        }
        setAdd(false);
      });
    }
  }, [navigate, newUser, add]);

  const onChangeHandler = (e) => {
    e.preventDefault();
    console.log(e.target);
    const { name, value: newValue } = e.target;
    console.log(newValue);
    setNewUser({ ...newUser, [name]: newValue });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("submitted: ", e.target);
    setAdd(true);
  };

  return (
    <div>
      <AuthForm
        user={newUser}
        onChange={onChangeHandler}
        onSubmit={onSubmitHandler}
        isRegister={true}
      />
    </div>
  );
};

export default AuthRegister;
