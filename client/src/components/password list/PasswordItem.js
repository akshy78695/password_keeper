import React, { useContext, useState } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import Clipboard from "react-clipboard.js";
import PasswordContext from "../../context/password/passwordContext";
import "./passwordStyle.css";

const PasswordItem = ({ passcode, formToggle, setFormToggle }) => {
    // creating password context instance
    const passwordContext = useContext(PasswordContext);
    //import methods from context
    const { deletePassword, setCurrent, clearCurrent } = passwordContext;
    const [showDeleteBox, setDeleteBox] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    let { _id, name, description, date, password } = passcode;
    let time = moment(date).format("hh:mm_DD/MM/YYYY");
    const getNameIcon = (name) => {
        name = name.trim();
        if (name === "google")
            return (
                <img
                    alt=""
                    src={`https://img.icons8.com/plasticine/25/000000/google-logo.png`}
                />
            );
        else if (name === "github") {
            return (
                <img
                    alt=""
                    src="https://img.icons8.com/fluent/25/000000/github.png"
                />
            );
        } else if (name === "paytm") {
            return (
                <img
                    alt=""
                    src="https://img.icons8.com/color/25/000000/paytm.png"
                />
            );
        } else if (name === "facebook") {
            return (
                <img
                    src="https://img.icons8.com/fluent/25/000000/facebook-new.png"
                    alt=""
                />
            );
        } else if (name === "instagram") {
            return (
                <img
                    src="https://img.icons8.com/fluent/25/000000/instagram-new.png"
                    alt=""
                />
            );
        } else {
            return (
                <img
                    src="https://img.icons8.com/doodle/25/000000/password.png"
                    alt=""
                />
            );
        }
    };
    const nameIcon = getNameIcon(name);
    const onDelete = () => {
        setDeleteBox(true);
        deletePassword(_id);
        clearCurrent();
    };
    const onEdit = () => {
        passcode.range = password.length <= 16 ? password.length : 8;
        setCurrent({
            ...passcode,
        });

        window.scroll({ top: 0, behavior: "smooth" });

        // const i = document.documentElement.scrollTop || document.body.scrollTop;
        // if (i > 0) {
        //     window.requestAnimationFrame(onEdit);
        //     window.scrollTo(0, i - i / 8);
        // }
        setFormToggle(true);
    };

    const onCopyClick = () => {
        // navigator.clipboard.writeText(password);

        let snackbar = document.getElementById("snackbar");
        snackbar.className = "show";
        setTimeout(() => {
            snackbar.className = snackbar.className.replace("show", "");
        }, 2000);
    };
    return (
        <div>
            <div className={`card mb-2`}>
                <div id="snackbar" style={{ borderRadius: "50px" }}>
                    Password copied!
                </div>
                <div
                    className={`card-header bg-white font-weight-bold  d-flex justify-content-between align-items-center ${
                        showDeleteBox ? "text-danger" : ""
                    }`}
                >
                    <span>
                        <span className="align-middle mr-2">{nameIcon}</span>

                        <span className="align-middle">{name}</span>
                    </span>
                    <Clipboard
                        option-text={() => password}
                        style={{
                            background: "none",
                            border: "none",
                            outline: "none",
                        }}
                    >
                        <span
                            className="d-flex justify-content-between align-items-center"
                            style={{ cursor: "pointer" }}
                            onClick={onCopyClick}
                        >
                            <span className="ml-2">
                                <svg
                                    width="1.2em"
                                    height="1.2em"
                                    viewBox="0 0 16 16"
                                    className="bi bi-clipboard"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        d="M9.5 1h-3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"
                                    />
                                </svg>
                            </span>
                        </span>
                    </Clipboard>
                </div>
                <div
                    className={`card-body pt-2 ${
                        showDeleteBox ? "text-danger" : ""
                    }`}
                >
                    <div className="d-flex align-items-center">
                        <span
                            className={`${
                                showDeleteBox ? "text-danger" : "text-secondary"
                            } mr-2`}
                        >
                            Password:{" "}
                        </span>
                        <span id="password">
                            {showPassword
                                ? password
                                : password !== null &&
                                  password.replace(/./g, "*")}
                        </span>
                        {/* {showPassword ? (
                            <span>{password}</span>
                        ) : (
                            password && (
                                <span>{password.replace(/./g, "*")}</span>
                            )
                        )} */}
                        <span
                            className="ml-auto btn p-1"
                            onClick={() => {
                                setShowPassword(!showPassword);
                                // setTimeout(() => setShowPassword(false), 3000);
                            }}
                            style={{ cursor: "pointer" }}
                        >
                            {showPassword ? (
                                <svg
                                    width="1.2em"
                                    height="1.2em"
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
                            ) : (
                                <svg
                                    width="1.2em"
                                    height="1.2em"
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
                            )}
                        </span>
                    </div>

                    <div>
                        <span
                            className={`${
                                showDeleteBox ? "text-danger" : "text-secondary"
                            } mr-2 mt-1`}
                        >
                            Description:{" "}
                        </span>
                        <span>{description || ""}</span>
                    </div>
                    <div>
                        <span
                            className={`${
                                showDeleteBox ? "text-danger" : "text-secondary"
                            } mr-2 mt-1`}
                        >
                            Date created:{" "}
                        </span>
                        <span className="font-italic">{time || ""}</span>
                    </div>
                    <div className="mt-2">
                        <button
                            className="btn btn-dark btn-sm mr-2"
                            onClick={onEdit}
                            disabled={showDeleteBox}
                        >
                            Edit
                        </button>
                        <button
                            className="btn btn-danger btn-sm"
                            disabled={showDeleteBox}
                            data-toggle="modal"
                            data-target="#deleteModal"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>

            {/* --------- */}
            {/* delete warning Modal */}
            {/* <!-- Button trigger modal --> */}
            {/* <!-- Modal --> */}
            <div
                className="modal fade"
                id="deleteModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
                style={{ overflow: "auto" }}
            >
                <div
                    className="modal-dialog modal-dialog-centered modal-sm"
                    role="document"
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Delete?
                            </h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        {/* <div className="modal-body">Are you sure?</div> */}
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary btn-sm"
                                data-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                onClick={onDelete}
                                data-dismiss="modal"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

PasswordItem.propTypes = {
    passcode: PropTypes.object.isRequired,
};

export default PasswordItem;

/* <div
    className="text-center card-body"
    style={{ backgroundColor: "#ff6666" }}
>
    <div className="h4 my-3 text-white">
        Deleting file..
    </div>
</div> */
