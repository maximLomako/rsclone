import React from "react";
import LoginForm from "./LoginForm";
import { NavLink, Route, useHistory } from "react-router-dom";
import Registration from "../Registration/Registration";
import { useSelector } from "react-redux";
import { DashboardRootState } from "../../redux/store";

const Login = () => {
  const history = useHistory();
  const userInfo = useSelector<DashboardRootState, any>(
    (state) => state.userInfo
  );
  if (userInfo.statusCode === 200) {
    history.push("/");
  }
  console.log(userInfo)
  return (
    <div className="login">
      <div className="login-container">
        <h1 className="login-text">
          Login or <NavLink to={"/registration"}>Registration</NavLink> for use
          app
        </h1>
        <LoginForm />
      </div>
      <Route color="inherit" path={"/registration"} component={Registration} />
    </div>
  );
};

export default Login;
