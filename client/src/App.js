import React, { Fragment } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import PasswordState from "./context/password/PasswordState";
import AuthState from "./context/auth/AuthState";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import AlertState from "./context/alert/AlertState";
import Alerts from "./components/layout/Alerts";
import setAuthToken from "./utails/setAuthToken";

if (localStorage.token) setAuthToken(localStorage.token);
const App = () => {
    return (
        <AuthState>
            <PasswordState>
                <AlertState>
                    <Router>
                        <Fragment>
                            <Navbar />
                            <div className="container bg-white">
                                <Alerts />
                                <Switch>
                                    <Route exact path="/" component={Home} />
                                    <Route
                                        exact
                                        path="/about"
                                        component={About}
                                    />
                                    <Route
                                        exact
                                        path="/register"
                                        component={Register}
                                    />
                                    <Route
                                        exact
                                        path="/login"
                                        component={Login}
                                    />
                                </Switch>
                            </div>
                        </Fragment>
                    </Router>
                </AlertState>
            </PasswordState>
        </AuthState>
    );
};

export default App;
