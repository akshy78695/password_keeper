import React, { useReducer } from "react";
import axios from "axios";
import authReducer from "./authReducer";
import AuthContext from "./authContext";
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERROR,
    START_LOADING,
    STOP_LOADING,
} from "../types";
import setAuthToken from "../../utails/setAuthToken";

const AuthState = (props) => {
    const initialState = {
        token: localStorage.getItem("token"),
        isAuthenticated: null,
        user: null,
        loading: null,
        error: null,
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    // Load User

    const loadUser = async () => {
        dispatch({ type: START_LOADING });
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        try {
            const res = await axios.get("/api/auth");
            dispatch({ type: USER_LOADED, payload: res.data });
        } catch (error) {
            dispatch({ type: AUTH_ERROR });
        } finally {
            dispatch({ type: STOP_LOADING });
        }
    };
    // Register User
    const registerUser = async (formData) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            dispatch({ type: START_LOADING });
            const res = await axios.post("/api/users", formData, config);
            dispatch({ type: REGISTER_SUCCESS, payload: res.data });
            // console.log(res.data);
            loadUser();
        } catch (error) {
            dispatch({
                type: REGISTER_FAIL,
                payload: error.response.data.message,
            });
        } finally {
            dispatch({ type: STOP_LOADING });
        }
    };
    // Login User
    const loginUser = async (formData) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        try {
            dispatch({ type: START_LOADING });
            const res = await axios.post("/api/auth", formData, config);
            dispatch({ type: LOGIN_SUCCESS, payload: res.data });
            loadUser();
        } catch (error) {
            dispatch({
                type: LOGIN_FAIL,
                payload: error.response.data.message,
            });
        } finally {
            dispatch({ type: STOP_LOADING });
        }
    };
    // Logout user
    const logout = () => {
        dispatch({ type: LOGOUT });
    };
    // clear errors
    const clearError = () => {
        dispatch({ type: CLEAR_ERROR });
    };
    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                user: state.user,
                loading: state.loading,
                error: state.error,
                registerUser,
                clearError,
                loadUser,
                loginUser,
                logout,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;
