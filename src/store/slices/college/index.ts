import { combineReducers } from '@reduxjs/toolkit'
import college from './collegeIdSlice'

const reducer = combineReducers({
    college,
})

export * from './collegeIdSlice'
export default reducer
