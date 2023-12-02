import React from "react";
import { Link } from "react-router-dom";
import "./Auth.css"

const AuthForm = ({ user, onChange, onSubmit, isRegister }) => {
  const white_background = {
    backgroundColor: "white"
  }
  return (
    <div className="auth">
      {isRegister && (
        <div className="message">
          <h1>Create Your Account!</h1>
        </div>
      )}
      {!isRegister && (
        <div className="message">
          <h1>Log Into Your Account!</h1>
        </div>
      )}
      <hr style={white_background} />
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
  );
};

export default AuthForm;