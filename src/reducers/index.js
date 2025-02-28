import { combineReducers } from 'redux'

import auth from './auth'
import accesses from './accesses'
import roleAccesses from './roleAccesses'
import workingHours from './workingHours'
import employees from './employees'

const rootReducer = combineReducers({
    auth,
    accesses,
    roleAccesses,
    workingHours,
    employees
})

export default rootReducer
