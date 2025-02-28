import makeStorage from '../utilities/storage';
import * as actions from '../actionTypes';

const storage = makeStorage();

const user = storage.getUser()

const initialState = user
    ?
    {
        isLoggingIn: false,
        isLoggedIn: true,
        isLoginRejected: false,
        loggedData: JSON.parse(user)
    }
    : {
        isLoggingIn: false,
        isLoggedIn: false,
        isLoginRejected: false,
        loggedData: {}
    };


export default function auth(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case actions.LOGIN_REQUEST:
            return {
                ...state,
                isLoggingIn: true,
                isLoginRejected: false
            }
        case actions.LOGIN_SUCCESS:
            return {
                ...state,
                isLoggingIn: false,
                isLoggedIn: true,
                loggedData: payload
            }
        case actions.LOGIN_FAILURE:
            return {
                ...state,
                isLoggingIn: false,
                isLoggedIn: false,
                isLoginRejected: true
            }
        case actions.LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                isLoggingIn: false,
                loggedData: {}
            }
        default: return state;
    }
}
