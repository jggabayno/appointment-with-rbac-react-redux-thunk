import makeRequest from '../utilities/api';
import * as actions from '../actionTypes'

const request = makeRequest();

export const loadEmployees = () => async (dispatch) => {

    dispatch({ type: actions.FETCH_EMPLOYEES_REQUEST })

    try {

        const response = await request.get('employees/');
        const data = await response.data;

        dispatch({ type: actions.FETCH_EMPLOYEES_SUCCESS, payload: data })

    } catch (error) {

        dispatch({ type: actions.FETCH_EMPLOYEES_FAILURE, payload: error.message })

    }
}