import makeRequest from '../utilities/api';
import * as actions from '../actionTypes'

const request = makeRequest();

export const loadRoleAccesses = () => async (dispatch) => {

    dispatch({ type: actions.FETCH_ROLE_ACCESSES_REQUEST })

    try {

        const response = await request.get('roleAccesses/');
        const data = await response.data;

        dispatch({ type: actions.FETCH_ROLE_ACCESSES_SUCCESS, payload: data })

    } catch (error) {

        dispatch({ type: actions.FETCH_ROLE_ACCESSES_FAILURE, payload: error.message })

    }
}