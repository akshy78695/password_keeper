import React, { useState, useContext, useEffect } from "react";
import PasswordContext from "../../context/password/passwordContext";
const PasswordForm = () => {
    const passwordContext = useContext(PasswordContext);
    let [passwordForm, setPasswordForm] = useState({
        name: "",
        password: "",
        description: "",
    });
    let { name, password, description } = passwordForm;
    const {
        addPassword,
        current,
        clearCurrent,
        updatePassword,
    } = passwordContext;

    useEffect(() => {
        if (current !== null) setPasswordForm(current);
        else
            setPasswordForm({
                name: "",
                password: "",
                description: "",
            });
    }, [current, passwordContext]);
    const onchange = (e) =>
        setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });

    const clearAll = () => {
        clearCurrent();
    };
    const onSubmit = (e) => {
        e.preventDefault();
        const newPassword = { ...passwordForm, date: new Date() };
        if (current === null) {
            addPassword(newPassword);
        } else {
            updatePassword(passwordForm);
        }
        clearAll();
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
            <div className="card-body">
                <div className="form-group">
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={onchange}
                        className="my-1 form-control"
                        placeholder="Name: e.g. google, paytm, etc."
                    />
                    <input
                        type="type"
                        name="password"
                        value={password}
                        className="my-1  form-control"
                        placeholder="Password: e.g. 8LDKJF%DFJ"
                        onChange={onchange}
                    />
                    <textarea
                        rows="2"
                        type="text"
                        value={description}
                        name="description"
                        className="my-1 form-control"
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
                        >
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
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default PasswordForm;
