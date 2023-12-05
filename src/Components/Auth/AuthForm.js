import React from "react";
import { Link } from "react-router-dom";
import "./Auth.css"

const AuthForm = ({ user, onChange, onSubmit, isRegister }) => {
  return (
    <div>
      <div className="image-content">
        <div className="first">
        </div>
        <div className="second">
        </div>
      </div>
      <div className="third">
       {isRegister && (
          <h1>Create Your Account!</h1>
        )}
        {!isRegister && (
          <h1>Log Into Your Account!</h1>
        )}
        <form onSubmit={onSubmit}>
          {isRegister && (
            <div className="input">
              <label>First Name</label>
              <br />
              <input
                type="text"
                value={user.firstName}
                onChange={onChange}
                name="firstName"
                placeholder="first name"
                required
              />
            </div>
          )}
          {isRegister && (
            <div  className="input" >
              <label>Last Name</label>
              <br />
              <input
                type="text"
                value={user.lastName}
                onChange={onChange}
                name="lastName"
                placeholder="last name"
                required
              />
            </div>
          )}
          <div  className="input">
            <label>Email</label>
            <br />
            <input
              type="email"
              value={user.email}
              onChange={onChange}
              name="email"
              placeholder="email"
              required
            />
          </div>
          <div  className="input">
            <label>Password</label>
            <br />
            <input
              type="password"
              value={user.password}
              onChange={onChange}
              name="password"
              placeholder="password"
              min="0"
              required
            />
          </div>
          <div className="submit">
            <button type="submit" onSubmit={onSubmit}>
              {isRegister ? "Register" : "Log In"}
            </button>
          </div>
          {isRegister && (
            <div className="login">
              <p>Already have an account? <Link to="/login" className="link">Log In</Link></p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AuthForm;