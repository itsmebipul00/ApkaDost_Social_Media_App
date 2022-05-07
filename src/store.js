import { configureStore } from '@reduxjs/toolkit'

import themeReducer from './Features/themeSlice'

import authReducer from './Features/authSlice'

const store = configureStore({
	reducer: {
		theme: themeReducer,
		auth: authReducer,
	},
})

export default store
