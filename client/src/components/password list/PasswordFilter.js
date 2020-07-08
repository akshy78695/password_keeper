import React, { useRef, useContext, useEffect } from "react";
import PasswordContext from "../../context/password/passwordContext";

const PasswordFilter = () => {
    const passwordContext = useContext(PasswordContext);

    const { filterPassword, clearFilter, filtered } = passwordContext;

    const text = useRef("");

    useEffect(() => {
        if (filtered === null) {
            text.current.value = "";
        }
    });

    const onChange = (e) => {
        if (text.current.value !== "") {
            filterPassword(e.target.value);
        } else {
            clearFilter();
        }
    };

    return (
        <form>
            <input
                ref={text}
                type="text"
                onChange={onChange}
                className="mb-2 form-control"
                placeholder="Filter.."
            />
        </form>
    );
};

export default PasswordFilter;
