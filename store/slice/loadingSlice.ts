import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface loadingState {
    loading: boolean
}

const initialState: loadingState = {
    loading: true
}

export const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setLoading } = loadingSlice.actions

export const loadingState = (state: loadingState) => state.loading

export default loadingSlice.reducer