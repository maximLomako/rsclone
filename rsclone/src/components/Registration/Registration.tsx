import React from "react";
import RegistrationForm from "./RegistrationForm";
import { NavLink, Route, useHistory } from "react-router-dom";
import Login from "../Login/Login";
import { useSelector } from "react-redux";
import { DashboardRootState } from "../../redux/store";

const Registration = () => {
  const history = useHistory();
  const userInfo = useSelector<DashboardRootState, any>(
    (state) => state.userInfo
  );
  if (userInfo.statusCode === 200) {
    history.push("/");
  }
  return (
    <div className="registration">
      <div className="registration-container">
        <h2 className="registration-text">
          Аlready registered? then <NavLink to={"/login"}>Login</NavLink>
        </h2>
        <RegistrationForm />
      </div>
      <Route color="inherit" path={"/login"} component={Login} />
    </div>
  );
};

export default Registration;
