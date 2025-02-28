import * as actions from '../actionTypes'

const initialState = {
    isLoading: false,
    data: [],
    error: '',
}

export default function workingHours(state = initialState, action) {
    switch (action.type) {
        case actions.FETCH_WORKING_HOURS_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case actions.FETCH_WORKING_HOURS_SUCCESS:
            return {
                isLoading: false,
                data: action.payload,
                error: ''
            }
        case actions.FETCH_WORKING_HOURS_FAILURE:
            return {
                isLoading: false,
                data: [],
                error: action.payload
            }
        case actions.STORE_WORKING_HOUR_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case actions.STORE_WORKING_HOUR_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: [action.payload, ...state.data],
                error: ''
            };
        case actions.STORE_WORKING_HOUR_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case actions.UPDATE_WORKING_HOUR_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case actions.UPDATE_WORKING_HOUR_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: [action.payload, ...state.data.filter(working_hour => working_hour.id !== action.payload.id)],
                error: ''
            }
        case actions.UPDATE_WORKING_HOUR_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        case actions.DESTROY_WORKING_HOUR_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case actions.DESTROY_WORKING_HOUR_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: state.data.filter((working_hour) => working_hour.id !== action.payload),
                error: ''
            };
        case actions.DESTROY_WORKING_HOUR_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        default: return state;
    }
}
