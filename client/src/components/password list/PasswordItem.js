import React, { useContext, useState } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import PasswordContext from "../../context/password/passwordContext";

const PasswordItem = ({ passcode }) => {
    // creating password context instance
    const passwordContext = useContext(PasswordContext);
    //import methods from context
    const { deletePassword, setCurrent, clearCurrent } = passwordContext;
    const [showDeleteBox, setDeleteBox] = useState(false);

    const { id, name, password, description, date } = passcode;
    let time = moment(date).format("hh:mm_DD/MM/YYYY");
    const getNameIcon = (name) => {
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
        setTimeout(() => deletePassword(id), 1700);
        clearCurrent();
    };
    const onEdit = () => {
        setCurrent(passcode);
    };
    return (
        <div>
            <div className={`card mb-2`}>
                <div
                    className={`card-header bg-white font-weight-bold  d-flex justify-content-between align-items-center ${
                        showDeleteBox ? "text-danger" : ""
                    }`}
                >
                    {name}

                    <span>{nameIcon}</span>
                </div>
                <div
                    className={`card-body ${
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
                        <span>{password}</span>
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
                            onClick={onDelete}
                            disabled={showDeleteBox}
                        >
                            Delete
                        </button>
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
