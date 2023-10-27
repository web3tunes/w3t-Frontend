import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface userProfile {
    activeTab: string
}

const initialState: userProfile = {
    activeTab: "under review"
}
export const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState,
    reducers: {
        setActiveTab: (state, action: PayloadAction<string>) => {
            // console.log(state.activeTab, action.payload)
            state.activeTab = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setActiveTab } = userProfileSlice.actions

export const profileActiveTabState = (state: userProfile) => state

export default userProfileSlice.reducer