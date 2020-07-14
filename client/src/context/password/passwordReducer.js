import {
    ADD_PASSWORD,
    DELETE_PASSWORD,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_PASSWORD,
    FILTER_PASSWORD,
    CLEAR_FILTER,
    PASSWORD_ERROR,
    GET_PASSWORDS,
    START_LOADING,
    STOP_LOADING,
    CLEAR_PASSWORDS,
    CLEAR_ERROR,
} from "../types";

export default (state, action) => {
    switch (action.type) {
        case GET_PASSWORDS:
            return {
                ...state,
                passwords: action.payload,
            };
        case ADD_PASSWORD:
            return {
                ...state,
                passwords: [action.payload, ...state.passwords],
            };
        case CLEAR_PASSWORDS:
            return {
                ...state,
                passwords: null,
                error: null,
                current: null,
                filtered: null,
            };
        case PASSWORD_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case CLEAR_ERROR:
            return { ...state, error: null };
        case UPDATE_PASSWORD:
            return {
                ...state,
                passwords: state.passwords.map((password) =>
                    password._id === action.payload._id
                        ? action.payload
                        : password
                ),
                filtered:
                    state.filtered &&
                    state.filtered.map((password) =>
                        password._id === action.payload._id
                            ? action.payload
                            : password
                    ),
            };
        case DELETE_PASSWORD:
            return {
                ...state,
                passwords: state.passwords.filter(
                    (password) => password._id !== action.payload
                ),
                filtered:
                    state.filtered !== null
                        ? state.filtered.filter(
                              (password) => password._id !== action.payload
                          )
                        : state.filtered,
            };
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload,
            };
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null,
            };
        case FILTER_PASSWORD:
            return {
                ...state,
                filtered: state.passwords.filter((password) => {
                    try {
                        const regex = new RegExp(`${action.payload}`, "gi");
                        return password.name.match(regex);
                    } catch (error) {
                        return password;
                    }
                    // ||
                    // password.description.match(regex)
                }),
            };
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null,
            };
        case START_LOADING:
            return {
                ...state,
                loading: true,
            };
        case STOP_LOADING:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};
