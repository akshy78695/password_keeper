import {
    REMOVE_ALERT,
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

export default (state, action) => {
    switch (action.type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem("token", action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
            };
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            };
        case CLEAR_ERROR:
            return {
                ...state,
                error: null,
            };
        case START_LOADING:
            return { ...state, loading: true };
        case STOP_LOADING:
            return { ...state, loading: false };
        default:
            return state;
    }
};
