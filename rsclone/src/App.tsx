import React from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import Loading from "./components/Loading/Loading";
import Registration from "./components/Registration/Registration"
import "./App.css";
import {
  AppBar,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { Route, NavLink } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">rsClone</Typography>
          <NavLink to={"/login"}>Login</NavLink>
          <NavLink to={"/dashboard"}>Dashboard</NavLink>
          <NavLink to={"/loading"}>Loading</NavLink>
          <NavLink to={"/registration"}>Registration</NavLink>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Route color="inherit" path={"/login"} component={Login} />
        <Route color="inherit" path={"/dashboard"} component={Dashboard} />
        <Route color="inherit" path={"/loading"} component={Loading} />
        <Route color="inherit" path={"/registration"} component={Registration} />
      </Container>
    </div>
  );
};

export default App;
