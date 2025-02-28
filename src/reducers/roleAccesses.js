import * as actions from '../actionTypes'

const initialState = {
    isLoading: false,
    data: [],
    error: '',
}

export default function roleAccesses(state = initialState, action) {
    switch (action.type) {
        case actions.FETCH_ROLE_ACCESSES_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case actions.FETCH_ROLE_ACCESSES_SUCCESS:
            return {
                isLoading: false,
                data: action.payload,
                error: ''
            }
        case actions.FETCH_ROLE_ACCESSES_FAILURE:
            return {
                isLoading: false,
                data: [],
                error: action.payload
            }
        default: return state;
    }
}
