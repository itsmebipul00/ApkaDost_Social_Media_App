import { createSlice } from '@reduxjs/toolkit'

const themeFromStorage = localStorage.getItem('theme')
	? JSON.parse(localStorage.getItem('theme'))
	: 'light'

const initialState = {
	themeType: themeFromStorage,
}

const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		toggleTheme: (state, action) => {
			state.themeType = action.payload
		},
	},
})

export const { toggleTheme } = themeSlice.actions

export default themeSlice.reducer
