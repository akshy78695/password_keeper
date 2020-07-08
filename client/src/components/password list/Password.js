import React, { useContext } from "react";
// import { CSSTransition, TransitionGroup } from "react-transition-group";
import PasswordContext from "../../context/password/passwordContext";
import PasswordItem from "./PasswordItem";
import PasswordForm from "./PasswordForm";
import PasswordFilter from "./PasswordFilter";
const Password = () => {
    const passwordContext = useContext(PasswordContext);
    const { passwords, filtered } = passwordContext;
    return (
        <div className="row">
            <div className="col-md-7">
                <PasswordFilter />
                {filtered !== null
                    ? filtered.map((password) => (
                          <PasswordItem key={password.id} passcode={password} />
                      ))
                    : passwords.map((password) => (
                          <PasswordItem key={password.id} passcode={password} />
                      ))}
            </div>
            <div className="col-md-5">
                <div className="h2">
                    <PasswordForm />
                </div>
            </div>
        </div>
    );
};

export default Password;
