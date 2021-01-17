import React from "react";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <div className="login">
      <div className="login-container">
        <h1 className="login-text">rsClone</h1>
        <LoginForm/>
      </div>
    </div>
  );
};

export default Login;