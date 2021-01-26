import React from "react";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import Preloader from "./components/Preloader/Preloader";
import Home from "./components/Home/Home";
import "./App.css";
import {
  AppBar,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { NavLink, Route } from "react-router-dom";
// import DashboardWithReducers from "./components/Dashboard/DashboardWithReducers";
import Dashboard from "./components/Dashboard/Dashboard";

const App = () => {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <NavLink to={"/home"}>
            <Typography variant="h6">rsClone</Typography>
          </NavLink>
          <NavLink to={"/dashboard"}>Dashboard</NavLink>
          <NavLink to={"/loading"}>Loading</NavLink>
          <NavLink to={"/login"}>Login</NavLink>
          <NavLink to={"/registration"}>Registration</NavLink>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Route color="inherit" path={"/login"} component={Login} />
        <Route
          color="inherit"
          path={"/registration"}
          component={Registration}
        />
        <Route color="inherit" path={"/dashboard"} component={Dashboard} />
        <Route color="inherit" path={"/loading"} component={Preloader} />
        <Route color="inherit" path={"/home"} component={Home} />
      </Container>
    </div>
  );
};

export default App;
