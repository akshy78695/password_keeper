import React, { useContext, useEffect, useState } from "react";
import PasswordContext from "../../context/password/passwordContext";
import PasswordItem from "./PasswordItem";
import PasswordForm from "./PasswordForm";
import PasswordFilter from "./PasswordFilter";
import Loading from "../layout/Loading";
let encryptor = require("simple-encryptor")(process.env.REACT_APP_SECRET_KEY);

const Password = () => {
    const passwordContext = useContext(PasswordContext);
    const { getPasswords, loading, passwords, filtered } = passwordContext;
    const [formToggle, setFormToggle] = useState(false);
    useEffect(() => {
        let isSubscribed = true;
        if (isSubscribed === true) getPasswords();
        return () => (isSubscribed = false);
        // eslint-disable-next-line
    }, []);
    return (
        <div className="row">
            <div className="col-md-7">
                <PasswordFilter />
                {loading && (
                    <Loading
                        margin_top={"10em"}
                        loaderMessage={"Loading passwords..."}
                    />
                )}
                {/* {passwords && passwords.length > 0 && ( */}
                { loading === false && (
                    <div className="row d-block d-sm-block d-md-none d-lg-none ">
                        <div className="col-12">
                            <div className="w-100 float-left">
                                <div
                                    className={`btn btn-${
                                        formToggle ? "danger" : "primary"
                                    } btn-sm float-right my-2`}
                                    // style={{ textAlign:"right" }}
                                    onClick={() => setFormToggle(!formToggle)}
                                >
                                    {formToggle ? (
                                        <span>Close Form</span>
                                    ) : (
                                        <span>Add Password</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {formToggle && (
                    <div className="d-block d-sm-block d-md-none d-lg-none">
                        <PasswordForm
                            setFormToggle={setFormToggle}
                            formToggle={formToggle}
                            />
                    </div>
                )}
                {passwords &&
                    passwords.length > 0 &&
                    filtered === null &&
                    passwords.map((password) => {
                        // let pass = encryptor.decrypt(password.password);
                        let newPassword = {
                            ...password,
                            password: encryptor.decrypt(password.password),
                        };
                        return (
                            <PasswordItem
                                key={password._id}
                                passcode={newPassword}
                                formToggle={formToggle}
                                setFormToggle={setFormToggle}
                            />
                        );
                    })}
                {filtered !== null &&
                    filtered.map((password) => {
                        let newPassword = {
                            ...password,
                            password: encryptor.decrypt(password.password),
                        };
                        return (
                            <PasswordItem
                                key={password._id}
                                passcode={newPassword}
                            />
                        );
                    })}
                {/* Error cannot map filter of undefined */}
                {/* {loading === true ? (
                    <Loading
                        margin_top={"10em"}
                        loaderMessage={"Loading passwords..."}
                    />
                ) : filtered === null ? (
                    passwords.map((password) => (
                        <PasswordItem key={password._id} passcode={password} />
                    ))
                ) : (
                    filtered.map((password) => (
                        <PasswordItem key={password._id} passcode={password} />
                    ))
                )} */}
                {loading === false && passwords && passwords.length === 0 && (
                    <div className="mt-2 text-center text-secondary font-italic">
                        0 Passwords Saved.
                    </div>
                )}
            </div>
            <div className="col-md-5 d-none d-sm-none d-md-block d-lg-block">
                <div className="">
                    <PasswordForm />
                </div>
            </div>
        </div>
    );
};

export default Password;
