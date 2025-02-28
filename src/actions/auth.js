import makeRequest from '../utilities/api';
import makeStorage from '../utilities/storage';

import * as actions from '../actionTypes'

const request = makeRequest();
const storage = makeStorage();

export const login = (credentials) => async (dispatch) => {

    dispatch({ type: actions.LOGIN_REQUEST, payload: {} })

    try {

        const response = await request.login('login/', credentials);
        const data = await response.data;

        if (data) {

            const { user, token } = data;

            storage.setToken(token)
            storage.setUser({ user })
            dispatch({ type: actions.LOGIN_SUCCESS, payload: { user } })
            window.location.reload()

        }

    } catch (error) {

        dispatch({ type: actions.LOGIN_FAILURE })

    }
}

export const logout = () => async (dispatch) => dispatch({ type: actions.LOGOUT });