import React, { useState } from "react";
import LoginForm from "./LoginForm";
import { httpPostTest } from "../../utils";
import { BrowserRouter as Route, NavLink, useHistory } from "react-router-dom";

const Login = () => {
  let history = useHistory();
  const [testStatus, setTestStatus] = useState("");
  const testAuth = async () => {
    httpPostTest(`/auth/test`).then((post) => {
      if (post.statusCode === 200) {
        setTestStatus("ok")
        history.push('/dashboard')
      }
      else {
        setTestStatus("fail")
      }
    });
  };
  return (
    <div className="login">
      <button onClick={testAuth}>test autorization</button>
      <span>{testStatus}</span>
      <div className="login-container">
        <h2 className="login-text">rsClone</h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
