import React, { useReducer } from "react";
import { v4 as uuid } from "uuid";
import PasswordContext from "./passwordContext";
import passwordReducer from "./passwordReducer";
import {
    ADD_PASSWORD,
    DELETE_PASSWORD,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_PASSWORD,
    FILTER_PASSWORD,
    CLEAR_FILTER,
} from "../types";

const PasswordState = (props) => {
    const initialState = {
        passwords: [
            {
                id: 1,
                name: "google",
                password: "3dfdf9jdkfjl",
                description: "google ka password",
                date: "2020-07-04T08:34:47.909Z",
            },
            {
                id: 2,
                name: "github",
                password: "asd3dfdf9jdkfjl",
                description: "github ka password",
                date: "2020-07-04T08:34:47.909Z",
            },
            {
                id: 3,
                name: "paytm",
                password: "309jdkfjl",
                description: "paytm ka password",
                date: "2020-07-04T08:34:15.318Z",
            },
            {
                id: 4,
                name: "facebook",
                password: "309jdkfjl",
                description: "paytm ka password",
                date: "2020-07-04T08:34:15.318Z",
            },
        ],
        current: null,
        filtered: null,
    };

    const [state, dispatch] = useReducer(passwordReducer, initialState);

    //Add password
    const addPassword = (newPassword) => {
        newPassword.id = uuid();
        dispatch({ type: ADD_PASSWORD, payload: newPassword });
    };
    //delete password
    const deletePassword = (id) => {
        dispatch({ type: DELETE_PASSWORD, payload: id });
    };
    //set current password
    const setCurrent = (password) => {
        dispatch({ type: SET_CURRENT, payload: password });
    };
    //clear current password
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    };
    //update password
    const updatePassword = (password) => {
        dispatch({ type: UPDATE_PASSWORD, payload: password });
    };
    //filter passwords
    const filterPassword = (text) => {
        dispatch({ type: FILTER_PASSWORD, payload: text });
    };
    //clear filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };

    return (
        <PasswordContext.Provider
            value={{
                passwords: state.passwords,
                current: state.current,
                filtered: state.filtered,
                addPassword,
                deletePassword,
                setCurrent,
                clearCurrent,
                updatePassword,
                filterPassword,
                clearFilter,
            }}
        >
            {props.children}
        </PasswordContext.Provider>
    );
};

export default PasswordState;
