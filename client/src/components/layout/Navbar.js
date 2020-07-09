import React, { useContext, Fragment } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const Navbar = (props) => {
    const authContext = useContext(AuthContext);

    const { isAuthenticated, user, logout } = authContext;

    const authLinks = (
        <Fragment>
            <li
                className="nav-item mr-2"
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
            >
                <div className="nav-link">Hey, {user && user.name}</div>
            </li>
            <li
                className="nav-item"
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
                onClick={() => {
                    logout();
                    // props.history.push("/login");
                }}
                style={{ cursor: "pointer" }}
            >
                <div className="nav-link">
                    <span className="">Logout</span>
                    <span className="align-self-middle ml-2">
                        <svg
                            width="1.5em"
                            height="1.5em"
                            viewBox="0 0 16 16"
                            className="bi bi-box-arrow-right"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M11.646 11.354a.5.5 0 0 1 0-.708L14.293 8l-2.647-2.646a.5.5 0 0 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0z"
                            />
                            <path
                                fillRule="evenodd"
                                d="M4.5 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5z"
                            />
                            <path
                                fillRule="evenodd"
                                d="M2 13.5A1.5 1.5 0 0 1 .5 12V4A1.5 1.5 0 0 1 2 2.5h7A1.5 1.5 0 0 1 10.5 4v1.5a.5.5 0 0 1-1 0V4a.5.5 0 0 0-.5-.5H2a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5v-1.5a.5.5 0 0 1 1 0V12A1.5 1.5 0 0 1 9 13.5H2z"
                            />
                        </svg>
                    </span>
                </div>
            </li>
        </Fragment>
    );
    const guestLink = (
        <Fragment>
            <li
                className="nav-item"
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
            >
                <NavLink to="/register" className="nav-link">
                    Register
                </NavLink>
            </li>
            <li
                className="nav-item"
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
            >
                <NavLink to="/login" className="nav-link">
                    Login
                </NavLink>
            </li>
        </Fragment>
    );
    return (
        <nav className="navbar navbar-expand-md sticky-top p-2 navbar-dark  bg-primary">
            <div className="navbar-brand ml-3">
                <span
                    className="align-self-center"
                    style={{ width: "fit-content" }}
                >
                    <img
                        src="https://img.icons8.com/color/28/000000/1password.png"
                        alt=""
                    />
                </span>
                <span className="ml-2 align-middle font-italic">
                    Pass_keeper
                </span>
            </div>
            <button
                className="navbar-toggler float-right"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
                style={{ outline: "none" }}
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse  " id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    {isAuthenticated === true && authLinks}
                    {isAuthenticated === false && guestLink}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
