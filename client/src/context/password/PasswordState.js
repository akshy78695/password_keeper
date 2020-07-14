import React, { useReducer } from "react";
import axios from "axios";
import PasswordContext from "./passwordContext";
import passwordReducer from "./passwordReducer";
import {
    ADD_PASSWORD,
    PASSWORD_ERROR,
    DELETE_PASSWORD,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_PASSWORD,
    FILTER_PASSWORD,
    CLEAR_FILTER,
    GET_PASSWORDS,
    START_LOADING,
    STOP_LOADING,
    CLEAR_PASSWORDS,
    CLEAR_ERROR,
} from "../types";

const PasswordState = (props) => {
    const initialState = {
        passwords: [],
        current: null,
        filtered: null,
        error: null,
        loading: false,
    };

    const [state, dispatch] = useReducer(passwordReducer, initialState);

    //Get passwords
    const getPasswords = async () => {
        try {
            dispatch({ type: START_LOADING });
            const res = await axios.get("/api/pass");
            dispatch({ type: GET_PASSWORDS, payload: res.data });
        } catch (error) {
            dispatch({ type: PASSWORD_ERROR });
        } finally {
            dispatch({ type: STOP_LOADING });
        }
    };

    //Add passwords
    const addPassword = async (newPassword) => {
        const config = {
            headers: {
                "Context-Type": "application/json",
            },
        };
        try {
            const res = await axios.post("/api/pass", newPassword, config);
            dispatch({ type: ADD_PASSWORD, payload: res.data });
        } catch (error) {
            dispatch({
                type: PASSWORD_ERROR,
                payload: error.response.data.message,
            });
        }
    };
    //delete password
    const deletePassword = async (id) => {
        try {
            // console.log(id);
            await axios.delete(`/api/pass/${id}`);
            dispatch({ type: DELETE_PASSWORD, payload: id });
        } catch (error) {
            dispatch({
                type: PASSWORD_ERROR,
                payload: error.response.data.message,
            });
        }
    };

    //update password
    const updatePassword = async (password) => {
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };
        try {
            const res = await axios.put(
                `/api/pass/${password._id}`,
                password,
                config
            );
            dispatch({ type: UPDATE_PASSWORD, payload: res.data });
        } catch (error) {
            dispatch({
                type: PASSWORD_ERROR,
                payload: error.response.data.message,
            });
        }
    };
    //clear passwords
    const clearPasswords = () => {
        dispatch({ type: CLEAR_PASSWORDS });
    };
    //set current password
    const setCurrent = (password) => {
        dispatch({ type: SET_CURRENT, payload: password });
    };
    //clear current password
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    };
    //filter passwords
    const filterPassword = (text) => {
        dispatch({ type: FILTER_PASSWORD, payload: text });
    };
    //clear filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };
    //clear error
    const clearError = () => {
        dispatch({ type: CLEAR_ERROR });
    };

    return (
        <PasswordContext.Provider
            value={{
                passwords: state.passwords,
                current: state.current,
                filtered: state.filtered,
                loading: state.loading,
                error: state.error,
                getPasswords,
                addPassword,
                deletePassword,
                setCurrent,
                clearCurrent,
                updatePassword,
                filterPassword,
                clearFilter,
                clearPasswords,
                clearError,
            }}
        >
            {props.children}
        </PasswordContext.Provider>
    );
};

export default PasswordState;
