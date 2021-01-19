import React,{useState} from "react";
import LoginForm from "./LoginForm";
import { httpPostTest } from "../../utils";

const Login = () => {
  const [testStatus, setTestStatus] = useState('');
  const testAuth = async () => {
    httpPostTest(`auth/test/`).then((post) => {
      post.statusCode === 200 ? setTestStatus("ok") : setTestStatus("fail");
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
