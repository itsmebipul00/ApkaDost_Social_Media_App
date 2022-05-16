import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import userService from '../Services/userServices'

const userInfo = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null

const initialState = {
	isLoggedIn: false,
	user: userInfo,
	isLoading: false,
	error: null,
	userDetails: null,
}

export const authUser = createAsyncThunk(
	'user/auth',
	async formData => await userService.authUser(formData)
)

export const likePost = createAsyncThunk(
	'user/likes',
	async postId => await userService.likePost(postId)
)

export const getUserInfo = createAsyncThunk(
	'user/userDetails',
	async id => await userService.getUserInfo(id)
)

const userSlice = createSlice({
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
			.addCase(getUserInfo.pending, state => {
				state.isLoading = true
			})
			.addCase(getUserInfo.fulfilled, (state, action) => {
				state.userDetails = action.payload
				state.isLoading = false
			})
			.addCase(getUserInfo.rejected, (state, action) => {
				state.error = action.payload
				state.isLoading = false
			})
	},
})

export default userSlice.reducer
