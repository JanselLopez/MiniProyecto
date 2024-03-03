import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type CollegeIdState = {
    collegeId?: number
}

export const initialState: CollegeIdState = {
    collegeId: undefined,
}

export const collegeIdSlice = createSlice({
    name: `collegeId`,
    initialState,
    reducers: {
        setCollegeId: (state, action: PayloadAction<number | undefined>) => {
            state.collegeId = action.payload
        },
    },
})

export const { setCollegeId } = collegeIdSlice.actions

export default collegeIdSlice.reducer
