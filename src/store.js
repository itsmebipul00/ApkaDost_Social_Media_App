import { configureStore } from '@reduxjs/toolkit'

import themeReducer from './Features/themeSlice'

import authReducer from './Features/authSlice'

import postsReducer from './Features/postsSlice'

const store = configureStore({
	reducer: {
		theme: themeReducer,
		auth: authReducer,
		posts: postsReducer,
	},
})

export default store
