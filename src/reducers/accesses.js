import * as actions from '../actionTypes'

const initialState = {
    isLoading: false,
    data: [],
    error: '',
}

export default function accesses(state = initialState, action) {
    switch (action.type) {
        case actions.FETCH_ACCESSES_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case actions.FETCH_ACCESSES_SUCCESS:
            return {
                isLoading: false,
                data: action.payload,
                error: ''
            }
        case actions.FETCH_ACCESSES_FAILURE:
            return {
                isLoading: false,
                data: [],
                error: action.payload
            }
        case actions.STORE_ACCESS_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case actions.STORE_ACCESS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: [action.payload, ...state.data],
                error: ''
            };
        case actions.STORE_ACCESS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case actions.UPDATE_ACCESS_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case actions.UPDATE_ACCESS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: [action.payload, ...state.data.filter(access => access.id !== action.payload.id)],
                error: ''
            }
        case actions.UPDATE_ACCESS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        case actions.DESTROY_ACCESS_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case actions.DESTROY_ACCESS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: state.data.filter((access) => access.id !== action.payload),
                error: ''
            };
        case actions.DESTROY_ACCESS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        default: return state;
    }
}
