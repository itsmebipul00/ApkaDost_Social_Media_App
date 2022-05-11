import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { API } from '../utils/api'

import axios from 'axios'

const userInfo = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null

const initialState = {
	isLoggedIn: false,
	user: userInfo,
	isLoading: false,
	error: null,
}

export const authUser = createAsyncThunk('/auth', async formData => {
	const config = {
		headers: {
			'Content-type': 'application/json',
		},
	}
	const { username, email, password } = formData

	try {
		const res = await axios.post(
			`${API}/api/auth`,
			{ username, email, password },
			config
		)

		return res.data
	} catch (error) {
		throw error
	}
})

const authSlice = createSlice({
	name: 'auth',
	initialState,
	extraReducers(builder) {
		builder
			.addCase(authUser.pending, state => {
				state.isLoading = true
				state.isLoggedIn = false
			})
			.addCase(authUser.fulfilled, (state, action) => {
				console.log(action.payload)

				localStorage.setItem(
					'userInfo',
					JSON.stringify(action.payload)
				)

				state.user = action.payload
				state.isLoading = false
				state.isLoggedIn = true
			})
			.addCase(authUser.rejected, (state, action) => {
				state.error = action.payload
				state.isLoading = false
				state.isLoggedIn = false
			})
	},
})

export default authSlice.reducer
