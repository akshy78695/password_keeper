import {
    ADD_PASSWORD,
    DELETE_PASSWORD,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_PASSWORD,
    FILTER_PASSWORD,
    CLEAR_FILTER,
} from "../types";

export default (state, action) => {
    switch (action.type) {
        case ADD_PASSWORD:
            return {
                ...state,
                passwords: [action.payload, ...state.passwords],
            };
        case UPDATE_PASSWORD:
            return {
                ...state,
                passwords: state.passwords.map((password) =>
                    password.id === action.payload.id
                        ? action.payload
                        : password
                ),
                filtered:
                    state.filtered &&
                    state.filtered.map((password) =>
                        password.id === action.payload.id
                            ? action.payload
                            : password
                    ),
            };
        case DELETE_PASSWORD:
            return {
                ...state,
                passwords: state.passwords.filter(
                    (password) => password.id !== action.payload
                ),
                filtered:
                    state.filtered !== null
                        ? state.filtered.filter(
                              (password) => password.id !== action.payload
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
                    const regex = new RegExp(`${action.payload}`, "gi");
                    return password.name.match(regex);
                    // ||
                    // password.description.match(regex)
                }),
            };
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null,
            };
        default:
            return state;
    }
};
