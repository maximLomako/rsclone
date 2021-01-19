import React, {useState} from "react";
import RegistrationForm from "./RegistrationForm";
import { httpPostTest } from "../../utils";

const Registration = () => {
   const [testStatus, setTestStatus] = useState('');
  const testAuth = async () => {
    httpPostTest(`auth/test/`).then((post) => {
      post.statusCode === 200 ? setTestStatus("ok") : setTestStatus("fail");
    });
  };
  return (
    <div className="registration">
      <button onClick={testAuth}>test autorization</button>
          <span>{testStatus}</span>
      <div className="registration-container">
        <h2 className="registration-text">rsClone</h2>
        <RegistrationForm />
      </div>
    </div>
  );
};

export default Registration;
