import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router";
import { AppContext } from "../context/AppContext";


const Header = () => {
    const appState = useContext(AppContext);

    const history = useHistory();

    return (
        <header>
            <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-secondary border-bottom box-shadow mb-3">
                <div className="container">
                    <NavLink className="navbar-brand" to="/">
                        React App
                    </NavLink>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target=".navbar-collapse"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                        <ul className="navbar-nav flex-grow-1">
                            {appState.token === null ? (
                                <></>
                            ) : (
                                <>
                                    {" "}
                                    <li className="nav-item">
                                        <NavLink className="nav-link text-dark" to="/todotasks">
                                            Todo Tasks
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link text-dark" to="/todocategories">
                                            Todo Categories
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link text-dark" to="/todopriorities">
                                            Todo Priorities
                                        </NavLink>
                                    </li>{" "}
                                </>
                            )}
                        </ul>
                        <ul className="navbar-nav">
                            {appState.token === null ? (
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link text-light" to="/identity/register">
                                            Register
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link text-light" to="/identity/login">
                                            Login
                                        </NavLink>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <span className="nav-link text-dark">
                                            {appState.firstName + " " + appState.lastName}
                                        </span>
                                    </li>
                                    <li className="nav-item">
                                       
                                        <button 
                                            onClick={(e) => {
                                                {
                                                    e.preventDefault();
                                                    appState.setAuthInfo(null, "", "");
                                                    history.replace("/");
                                                }
                                            }}
                                            className="btn btn-link nav-link text-light"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
