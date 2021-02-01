// @ts-nocheck
import React, { useEffect } from "react";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import Home from "./components/Home/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import { NavLink, Route, useHistory } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import { useDispatch, useSelector } from "react-redux";
import { authUserAC, logoutUserAC, UserInfoType } from "./redux/auth-reducer";
import { DashboardRootState } from "./redux/store";
import useStyles from "./AppClasses";
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import "./App.css";

export type UserInfoStateType = {
  [key: string]: Array<UserInfoType>;
};

const App = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const appClasses = useStyles();
  const userInfo = useSelector<DashboardRootState, UserInfoStateType>(
    (state) => state.userInfo
  );

  const logout = () => {
    dispatch(logoutUserAC());
    localStorage.removeItem("token");
    history.push("/home");
  };

  useEffect(() => {
    dispatch(authUserAC());
    if (userInfo.statusCode === 200) {
      history.push("/home");
    }
  }, [dispatch, history, userInfo.statusCode]);

  return (
    <div className={appClasses.root}>
      <AppBar className={appClasses.header} position="static">
        <Toolbar className={appClasses.toolbar}>
          <div className="left-menu">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              className={appClasses.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <NavLink to={"/home"} className={appClasses.link}>
              <Typography variant="h6">
                rsCloneTrello
              </Typography>
            </NavLink>
            <NavLink className={appClasses.link} to={"/dashboard"}>
              Dashboard
            </NavLink>
          </div>
          <div className="right-menu">
            {userInfo.userInfo.statusCode !== 200 ? (
              <NavLink to={"/login"}>Login</NavLink>
            ) : (
              userInfo.userInfo.username
            )}
            {userInfo.userInfo.statusCode !== 200 ? (
              <NavLink to={"/registration"}>Registration</NavLink>
            ) : (
              <NavLink to={"/home"} onClick={() => logout()}>
                Logout
              </NavLink>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <Container className={appClasses.main} component="main">
        <Route color="inherit" path={"/login"} component={Login} />
        <Route color="inherit" path={"/dashboard"} component={Dashboard} />
        <Route color="inherit" path={"/home"} component={Home} />
        <Route
          color="inherit"
          path={"/registration"}
          component={Registration}
        />
      </Container>
      <footer className={appClasses.footer}>
        <Container className={appClasses.footerContainer} maxWidth="sm">
          <a href="https://rs.school/js/">
            <img
              className="footer__logo-img"
              src="https://rs.school/images/rs_school_js.svg"
              alt="Rolling Scopes"
            />
          </a>
          <span>2021</span>
          <div className="footer__authors">
            <p>Created by:</p>
            <ul className="footer__authors-list">
              <li className="footer__authors-link">
                <a href="https://github.com/blinkoliver">blinkoliver</a>
              </li>
              <li className="footer__authors-link">
                <a href="https://github.com/maximLomako">maximlomako</a>
              </li>
              <li className="footer__authors-link">
                <a href="https://github.com/antipea">antipea</a>
              </li>
            </ul>
          </div>
        </Container>
      </footer>
    </div>
  );
};
export default App;
