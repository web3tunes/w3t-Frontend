import { configureStore } from '@reduxjs/toolkit'
import loadingSlice from './slice/loadingSlice'
import userProfileSlice from './slice/userProfileSlice'

export default configureStore({
    reducer: {
        loading: loadingSlice,
        userProfile: userProfileSlice
    },
})