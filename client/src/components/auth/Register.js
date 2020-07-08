import React, { useState, useContext, Fragment, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

const Register = (props) => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
    });

    const [showNameAlert, setNameAlert] = useState(true);
    const [showEmailAlert, setEmailAlert] = useState(false);
    const [showPasswordAlert, setPasswordAlert] = useState(false);
    const [showPassword2Alert, setPassword2Alert] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { name, email, password, password2 } = user;

    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;
    const {
        registerUser,
        loading,
        error,
        clearError,
        isAuthenticated,
    } = authContext;

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push("/");
        }
        if (error === "User already exist") {
            setAlert("danger", `Email already exist`);
            clearError();
            // eslint-disable-next-line
        }
    }, [error, isAuthenticated, props.history]);
    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        //validation (little complex)
        if (e.target.name === "name") {
            if (e.target.value.length > 3) {
                return setNameAlert(false);
            }
            setNameAlert(true);
        }
        if (e.target.name === "email") {
            if (
                /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g.test(e.target.value)
            ) {
                return setEmailAlert(false);
            }
            return setEmailAlert(true);
        }
        if (e.target.name === "password") {
            if (e.target.value.length >= 6) {
                return setPasswordAlert(false);
            }
            setPasswordAlert(true);
        }
        if (e.target.name === "password2") {
            if (e.target.value === password) {
                return setPassword2Alert(false);
            }
            setPassword2Alert(true);
        }
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        await registerUser({
            name,
            email,
            password,
        });
    };
    const onPasswordShow = () => {
        setShowPassword(!showPassword);
        setTimeout(() => {
            setShowPassword(showPassword);
        }, 2000);
    };
    return (
        <div
            className={`card mx-auto  mt-3 px-3 border pb-4 register-shadow`}
            style={{ maxWidth: "350px" }}
        >
            <form className="px-1" onSubmit={onSubmit}>
                <div className="text-center h3 my-2">
                    <span className="text-dark">Register </span>
                    <span className="text-primary">User</span>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={onChange}
                        className="form-control register-input"
                        placeholder={`e.g. X Æ A-12${"*"}`}
                    />
                    {showNameAlert && (
                        <span
                            className="text-danger ml-2"
                            style={{ fontSize: "14px" }}
                        >
                            *Please enter name
                        </span>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        className="form-control register-input"
                        placeholder="e.g (your email)"
                    />
                    {showEmailAlert && (
                        <span
                            className="text-danger ml-2"
                            style={{ fontSize: "14px" }}
                        >
                            *Please enter a valid email
                        </span>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="password">password:</label>
                    <div className="input-group mb-2 register-input">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={password}
                            onChange={onChange}
                            className="form-control "
                            required
                            minLength="6"
                        />
                        <div className="input-group-prepend">
                            <span
                                className="btn input-group-text"
                                onClick={onPasswordShow}
                            >
                                {showPassword ? (
                                    <span className="align-middle">
                                        <svg
                                            width="1em"
                                            height="1em"
                                            viewBox="0 0 16 16"
                                            className="bi bi-eye"
                                            fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.134 13.134 0 0 0 1.66 2.043C4.12 11.332 5.88 12.5 8 12.5c2.12 0 3.879-1.168 5.168-2.457A13.134 13.134 0 0 0 14.828 8a13.133 13.133 0 0 0-1.66-2.043C11.879 4.668 10.119 3.5 8 3.5c-2.12 0-3.879 1.168-5.168 2.457A13.133 13.133 0 0 0 1.172 8z"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
                                            />
                                        </svg>
                                    </span>
                                ) : (
                                    <span className="align-middle">
                                        <svg
                                            width="1em"
                                            height="1em"
                                            viewBox="0 0 16 16"
                                            className="bi bi-eye-slash"
                                            fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                                            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299l.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                                            <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709z" />
                                            <path
                                                fillRule="evenodd"
                                                d="M13.646 14.354l-12-12 .708-.708 12 12-.708.708z"
                                            />
                                        </svg>
                                    </span>
                                )}
                            </span>
                        </div>
                    </div>
                    {showPasswordAlert && (
                        <span
                            className="text-danger ml-2"
                            style={{ fontSize: "14px" }}
                        >
                            *Enter (min 6 charecters) password
                        </span>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="password2">Confirm password:</label>
                    <input
                        type="password"
                        name="password2"
                        value={password2}
                        onChange={onChange}
                        className="form-control register-input"
                    />
                    {showPassword2Alert && (
                        <span
                            className="text-danger ml-2"
                            style={{ fontSize: "14px" }}
                        >
                            *Please confirm password
                        </span>
                    )}
                </div>
                <button
                    type="submit"
                    className="btn btn-primary float-right"
                    disabled={
                        name.length > 3 &&
                        /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g.test(
                            email
                        ) &&
                        password.length > 6 &&
                        password === password2
                            ? false
                            : true
                    }
                >
                    {loading ? (
                        <Fragment>
                            <span
                                className="spinner-border mx-3"
                                role="status"
                                aria-hidden="true"
                                style={{ width: "1.4rem", height: "1.4rem" }}
                            ></span>
                            <span className="sr-only">Loading...</span>
                        </Fragment>
                    ) : (
                        <span>Register</span>
                    )}
                </button>
            </form>
        </div>
    );
};

export default Register;
