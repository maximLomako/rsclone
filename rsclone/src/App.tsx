// @ts-nocheck
import React, { useEffect } from "react";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import Preloader from "./components/Preloader/Preloader";
import Home from "./components/Home/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import { NavLink, Route, useHistory } from "react-router-dom";
import { Menu } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { authUserAC, logoutUserAC, UserInfoType } from "./redux/auth-reducer";
import { DashboardRootState } from "./redux/store";
import "./App.css";
import {
  AppBar,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";

export type UserInfoStateType = {
  [key: string]: Array<UserInfoType>;
};

const App = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const userInfo = useSelector<DashboardRootState, UserInfoStateType>(
    (state) => state.userInfo
  );

  const logout = () => {
    dispatch(logoutUserAC());
    localStorage.removeItem("token");
  };

  if (userInfo.statusCode !== 200) {
    history.push("/login");
  }
  else{
    history.push("/home")
  }

  useEffect(() => {
    dispatch(authUserAC());
  }, [dispatch]);

  console.log(userInfo);

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>{" "}
          <NavLink to={"/"}>
            <Typography variant="h6">rsClone</Typography>
          </NavLink>
          <NavLink to={"/dashboard"}>Dashboard</NavLink>
          <NavLink to={"/loading"}>Loading</NavLink>
          {userInfo.userInfo.statusCode !== 200 ? (
            <NavLink to={"/login"}>Login</NavLink>
          ) : (
            userInfo.userInfo.username
          )}
          {userInfo.userInfo.statusCode !== 200 ? (
            <NavLink to={"/registration"}>Registration</NavLink>
          ) : (
            <NavLink to={"/logout"} onClick={() => logout()}>
              Logout
            </NavLink>
          )}
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Route color="inherit" path={"/login"} component={Login} />
        <Route color="inherit" path={"/dashboard"} component={Dashboard} />
        <Route color="inherit" path={"/loading"} component={Preloader} />
        <Route color="inherit" path={"/"} component={Home} />
        <Route
          color="inherit"
          path={"/registration"}
          component={Registration}
        />
      </Container>
    </div>
  );
};

export default App;
