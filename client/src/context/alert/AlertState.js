import React, { useReducer } from "react";
import AlertContext from "./alertContext";
import alertReducer from "./alertReducer";
import { SET_ALERT, REMOVE_ALERT } from "../types";
import { v4 } from "uuid";

const AlertState = (props) => {
    const initialState = [];

    const [state, dispatch] = useReducer(alertReducer, initialState);

    const setAlert = (type, message, timeout = 3000) => {
        const id = v4();
        dispatch({ type: SET_ALERT, payload: { type, message, id } });

        setTimeout(
            () => dispatch({ type: REMOVE_ALERT, payload: id }),
            timeout
        );
    };
    return (
        <AlertContext.Provider value={{ alerts: state, setAlert }}>
            {props.children}
        </AlertContext.Provider>
    );
};

export default AlertState;
