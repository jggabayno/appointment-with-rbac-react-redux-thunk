import makeRequest from '../utilities/api';
import * as actions from '../actionTypes'

const request = makeRequest();

export const loadAccesses = () => async (dispatch) => {

    dispatch({ type: actions.FETCH_ACCESSES_REQUEST })

    try {

        const response = await request.get('accesses/');
        const data = await response.data;

        dispatch({ type: actions.FETCH_ACCESSES_SUCCESS, payload: data })

    } catch (error) {

        dispatch({ type: actions.FETCH_ACCESSES_FAILURE, payload: error.message })

    }
}

export const storeAccess = (params) => async (dispatch) => {

    dispatch({ type: actions.STORE_ACCESS_REQUEST })

    try {

        const response = await request.post('accesses/', params)
        const data = await response.data;

        dispatch({ type: actions.STORE_ACCESS_SUCCESS, payload: data, })


    } catch (error) {

        dispatch({ type: actions.STORE_ACCESS_FAILURE, payload: error.message })

    }
}

export const updateAccess = (id, params) => async (dispatch) => {

    dispatch({ type: actions.UPDATE_ACCESS_REQUEST })

    try {

        const response = await request.update(`accesses/${id}/`, params)
        const data = await response.data;

        if (data) {
            dispatch({ type: actions.UPDATE_ACCESS_SUCCESS, payload: { id, ...params } })
        }

    } catch (error) {

        dispatch({ type: actions.UPDATE_ACCESS_FAILURE, payload: error.message })

    }
}

export const destroyAccess = (id) => async (dispatch) => {

    dispatch({ type: actions.DESTROY_ACCESS_REQUEST })

    try {

        await request.drop('accesses/' + id)

        dispatch({ type: actions.DESTROY_ACCESS_SUCCESS, payload: id })

    } catch (error) {

        dispatch({ type: actions.DESTROY_ACCESS_FAILURE, payload: error.message })

    }
}