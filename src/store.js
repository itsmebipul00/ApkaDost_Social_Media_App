import { configureStore } from '@reduxjs/toolkit'

import themeReducer from './Features/themeSlice'

import authReducer from './Features/authSlice'

import postsReducer from './Features/postsSlice'

const store = configureStore({
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			immutableCheck: false,
			serializableCheck: false,
		}),

	reducer: {
		theme: themeReducer,
		auth: authReducer,
		posts: postsReducer,
	},
})

export default store
