import makeRequest from '../utilities/api';
import * as actions from '../actionTypes'

const request = makeRequest();

export const loadWorkingHours = () => async (dispatch) => {

    dispatch({ type: actions.FETCH_WORKING_HOURS_REQUEST })

    try {

        const response = await request.get('workinghours/');
        const data = await response.data;

        dispatch({ type: actions.FETCH_WORKING_HOURS_SUCCESS, payload: data })

    } catch (error) {

        dispatch({ type: actions.FETCH_WORKING_HOURS_FAILURE, payload: error.message })

    }
}

export const storeWorkingHour = (params) => async (dispatch) => {

    dispatch({ type: actions.STORE_WORKING_HOUR_REQUEST })

    try {

        const response = await request.post('workinghours/', params)
        const data = await response.data;

        dispatch({ type: actions.STORE_WORKING_HOUR_SUCCESS, payload: data, })


    } catch (error) {

        dispatch({ type: actions.STORE_WORKING_HOUR_FAILURE, payload: error.message })

    }
}

export const updateWorkingHour = (id, params) => async (dispatch) => {

    dispatch({ type: actions.UPDATE_WORKING_HOUR_REQUEST })

    try {

        const response = await request.update(`workinghours/${id}/`, params)
        const data = await response.data;

        if (data) {
            dispatch({ type: actions.UPDATE_WORKING_HOUR_SUCCESS, payload: { id, ...params } })
        }

    } catch (error) {

        dispatch({ type: actions.UPDATE_WORKING_HOUR_FAILURE, payload: error.message })

    }
}

export const destroyWorkingHour = (id) => async (dispatch) => {

    dispatch({ type: actions.DESTROY_WORKING_HOUR_REQUEST })

    try {

        await request.drop('accesses/' + id)

        dispatch({ type: actions.DESTROY_WORKING_HOUR_SUCCESS, payload: id })

    } catch (error) {

        dispatch({ type: actions.DESTROY_WORKING_HOUR_FAILURE, payload: error.message })

    }
}