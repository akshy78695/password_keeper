import React, { useState, useContext, useEffect, Fragment } from "react";
import generator from "generate-password";
import PasswordContext from "../../context/password/passwordContext";
import AlertContext from "../../context/alert/alertContext";
let encryptor = require("simple-encryptor")(process.env.REACT_APP_SECRET_KEY);

const PasswordForm = ({ setFormToggle, formToggle }) => {
    // .split("").reverse().join("") rev
    const passwordContext = useContext(PasswordContext);
    const alertContext = useContext(AlertContext);
    const {
        addPassword,
        current,
        clearCurrent,
        updatePassword,
        error,
        clearError,
    } = passwordContext;
    const { setAlert } = alertContext;
    let [passwordForm, setPasswordForm] = useState({
        name: "",
        password: "",
        description: "",
        range: 8,
        number: false,
        uppercase: false,
        lowercase: false,
        symbol: false,
    });
    let [passwordGenerator, setPasswordGenerator] = useState(false);
    const [NameAlert, setNameAlert] = useState(false);
    const [passwordAlert, setPasswordAlert] = useState(false);
    const [loading, setLoading] = useState(false);
    let {
        name,
        password,
        description,
        range,
        number,
        uppercase,
        symbol,
    } = passwordForm;
    // const cryptr = new Cryptr(user.email.split("").reverse().join(""))
    // console.log(cryptr.encrypt("bacon"))
    // console.log(cryptr.encrypt("bacon"))
    // console.log(cryptr.encrypt("bacon"))
    useEffect(() => {
        if (current !== null) {
            setPasswordForm(current);
        } else {
            setPasswordForm({
                name: "",
                password: "",
                description: "",
                range: 6,
                number: false,
                uppercase: false,
                symbol: false,
            });
        }
        if (error === "Server Error") {
            setAlert("danger", "Something went wrong, please try again!");
            clearError();
        }
        // eslint-disable-next-line
    }, [current, passwordContext]);
    const onchange = (e) => {
        setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
        if (e.target.name === "name") {
            if (e.target.value.length > 3) {
                return setNameAlert(false);
            }
            setNameAlert(true);
        }
        if (e.target.name === "password") {
            if (e.target.value.length >= 6 && e.target.value.length <= 20) {
                return setPasswordAlert(false);
            }
            setPasswordAlert(true);
        }
    };
    const onCheckchange = (e) => {
        if (e.target.name === "number") {
            setPasswordForm({ ...passwordForm, number: !number });
        }
        if (e.target.name === "uppercase") {
            setPasswordForm({ ...passwordForm, uppercase: !uppercase });
        }
        if (e.target.name === "symbol") {
            setPasswordForm({ ...passwordForm, symbol: !symbol });
        }
    };

    const onGenerate = () => {
        let generate = generator.generate({
            length: range,
            numbers: number,
            uppercase: uppercase,
            lowercase: true,
            symbols: symbol,
        });
        setPasswordForm({ ...passwordForm, password: generate });
        setPasswordAlert(false);
    };
    const clearAll = () => {
        clearCurrent();
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        setPasswordGenerator(false);
        const newPassword = {
            ...passwordForm,
            date: new Date(),
            password: encryptor.encrypt(password),
        };
        if (current === null) {
            addPassword(newPassword);
        } else {
            passwordForm.password = encryptor.encrypt(password);
            updatePassword(passwordForm);
        }
        clearAll();
        setLoading(false);
    };
    return (
        <form className="card" onSubmit={onSubmit}>
            <div className="card-header h4 ">
                <span className="align-self-center mr-2">
                    <img
                        src="https://img.icons8.com/ultraviolet/28/000000/add-key.png"
                        alt=""
                    />
                </span>
                <span className="align-middle">
                    {current ? "Update Password" : "Add Password"}
                </span>
            </div>
            <div className="card-body h6">
                <div className="form-group">
                    <div className="input-grout mt-2">
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={onchange}
                            className="mt-1 form-control"
                            placeholder="Name: e.g. google, paytm, etc."
                        />
                        {NameAlert && (
                            <div>
                                <span
                                    className="text-danger ml-2"
                                    style={{ fontSize: "13px" }}
                                >
                                    *Name min 3 characters.
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="input-group mt-2">
                        <input
                            type="text"
                            name="password"
                            value={password}
                            className=" form-control"
                            placeholder="Password: e.g. 8LDKJF%DFJ"
                            onChange={onchange}
                        />
                        <div className="input-group-append">
                            <span
                                className="input-group-text btn"
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                    setPasswordGenerator(!passwordGenerator)
                                }
                            >
                                {" "}
                                <svg
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 16 16"
                                    className="bi bi-shuffle"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12.646 1.146a.5.5 0 0 1 .708 0l2.5 2.5a.5.5 0 0 1 0 .708l-2.5 2.5a.5.5 0 0 1-.708-.708L14.793 4l-2.147-2.146a.5.5 0 0 1 0-.708zm0 8a.5.5 0 0 1 .708 0l2.5 2.5a.5.5 0 0 1 0 .708l-2.5 2.5a.5.5 0 0 1-.708-.708L14.793 12l-2.147-2.146a.5.5 0 0 1 0-.708z"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        d="M0 4a.5.5 0 0 1 .5-.5h2c3.053 0 4.564 2.258 5.856 4.226l.08.123c.636.97 1.224 1.865 1.932 2.539.718.682 1.538 1.112 2.632 1.112h2a.5.5 0 0 1 0 1h-2c-1.406 0-2.461-.57-3.321-1.388-.795-.755-1.441-1.742-2.055-2.679l-.105-.159C6.186 6.242 4.947 4.5 2.5 4.5h-2A.5.5 0 0 1 0 4z"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        d="M0 12a.5.5 0 0 0 .5.5h2c3.053 0 4.564-2.258 5.856-4.226l.08-.123c.636-.97 1.224-1.865 1.932-2.539C11.086 4.93 11.906 4.5 13 4.5h2a.5.5 0 0 0 0-1h-2c-1.406 0-2.461.57-3.321 1.388-.795.755-1.441 1.742-2.055 2.679l-.105.159C6.186 9.758 4.947 11.5 2.5 11.5h-2a.5.5 0 0 0-.5.5z"
                                    />
                                </svg>
                            </span>
                        </div>
                    </div>
                    {passwordAlert && (
                        <div>
                            <span
                                className="text-danger ml-2"
                                style={{ fontSize: "13px" }}
                            >
                                *Password min 6/max 20 characters.
                            </span>
                        </div>
                    )}
                    {passwordGenerator && (
                        <Fragment>
                            <div className="input-group my-2">
                                <label
                                    htmlFor="range"
                                    className="h6 text-secondary"
                                >
                                    Length:<span className="ml-3">{range}</span>{" "}
                                </label>
                                <div className="input-group mx-2">
                                    <input
                                        type="range"
                                        name="range"
                                        min="6"
                                        max="16"
                                        value={range}
                                        onChange={onchange}
                                        className="form-control-range"
                                    />
                                </div>
                                <div className="form-check ml-2">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="number"
                                        name="number"
                                        value={number}
                                        onChange={onCheckchange}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="number"
                                    >
                                        Numbers
                                    </label>
                                </div>
                                <br />
                                <div className="form-check ml-2">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="uppercase"
                                        name="uppercase"
                                        value={uppercase}
                                        onChange={onCheckchange}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="uppercase"
                                    >
                                        uppercase
                                    </label>
                                </div>
                                <br />
                                <div className="form-check ml-2">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="symbol"
                                        name="symbol"
                                        value={symbol}
                                        onChange={onCheckchange}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="symbol"
                                    >
                                        symbol
                                    </label>
                                </div>
                                <br />
                                <span
                                    className="btn btn-secondary btn-sm ml-auto mt-3"
                                    onClick={onGenerate}
                                >
                                    Generate
                                </span>
                            </div>
                            <hr className="my-1" />
                        </Fragment>
                    )}
                    <textarea
                        rows="2"
                        type="text"
                        value={description}
                        name="description"
                        className="my-2 form-control"
                        placeholder="Description"
                        onChange={onchange}
                    />
                    <div className="float-right">
                        {current && (
                            <button
                                className="btn btn-sm mr-2 mt-2 px-2 font-weight-bold"
                                style={{ backgroundColor: "#f2f2f2" }}
                                onClick={clearAll}
                            >
                                <span>
                                    <svg
                                        width="1.2em"
                                        height="1.2em"
                                        viewBox="0 0 16 16"
                                        className="bi bi-dash"
                                        fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M3.5 8a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.5-.5z"
                                        />
                                    </svg>
                                </span>
                                Clear
                            </button>
                        )}
                        <button
                            type="submit"
                            className="btn btn-sm border font-weight-bold  mr-2 mt-2 px-2"
                            style={{ backgroundColor: "#bfbfbf" }}
                            disabled={
                                name.length > 0 &&
                                password &&
                                password.length >= 6 &&
                                password.length <= 20
                                    ? false
                                    : true
                            }
                            onClick={() => {
                                if (formToggle)
                                    setTimeout(() => setFormToggle(false), 200);
                            }}
                        >
                            {loading ? (
                                <div
                                    className="spinner-border my-1 mx-3 "
                                    role="status"
                                    style={{
                                        width: "1.3rem",
                                        height: "1.3rem",
                                    }}
                                >
                                    <span className="sr-only">Loading...</span>
                                </div>
                            ) : (
                                <Fragment>
                                    <span className="">
                                        <svg
                                            width="1.2em"
                                            height="1.2em"
                                            viewBox="0 0 16 16"
                                            className="bi bi-plus align-items-center "
                                            fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z"
                                            />
                                        </svg>
                                    </span>
                                    <span className="align-middle">
                                        {current ? "Update" : "Add"}
                                    </span>
                                </Fragment>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default PasswordForm;
