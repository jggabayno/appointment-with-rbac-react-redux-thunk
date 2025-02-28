import * as actions from '../actionTypes'

const initialState = {
    isLoading: false,
    data: [],
    error: '',
}

export default function employees(state = initialState, action) {
    switch (action.type) {
        case actions.FETCH_EMPLOYEES_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case actions.FETCH_EMPLOYEES_SUCCESS:
            return {
                isLoading: false,
                data: action.payload,
                error: ''
            }
        case actions.FETCH_EMPLOYEES_FAILURE:
            return {
                isLoading: false,
                data: [],
                error: action.payload
            }
        default: return state;
    }
}
