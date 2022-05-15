import { configureStore } from '@reduxjs/toolkit'

import themeReducer from './Features/themeSlice'

import userReducer from './Features/userSlice'

import postsReducer from './Features/postsSlice'

const store = configureStore({
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			immutableCheck: false,
			serializableCheck: false,
		}),

	reducer: {
		theme: themeReducer,
		auth: userReducer,
		posts: postsReducer,
	},
})

export default store
