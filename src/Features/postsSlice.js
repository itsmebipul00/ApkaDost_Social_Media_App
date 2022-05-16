import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import postsService from '../Services/postsServices'

const initialState = {
	allPosts: [],
	isLoading: false,
	error: null,
	userPosts: [],
}

export const createNewPost = createAsyncThunk(
	'posts/createPost',
	async newPost => await postsService.createPost(newPost)
)

export const getAllPosts = createAsyncThunk(
	'posts/allPosts',
	async () => await postsService.getAllPosts()
)

export const toggleLikes = createAsyncThunk(
	'posts/toggleLikes',
	async id => await postsService.toggleLikes(id)
)

export const getUsersPosts = createAsyncThunk(
	'posts/user',
	async id => await postsService.getUserPosts(id)
)

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	extraReducers(builder) {
		builder
			.addCase(getAllPosts.pending, state => {
				state.isLoading = true
			})
			.addCase(getAllPosts.fulfilled, (state, action) => {
				console.log(action.payload)
				state.allPosts = action.payload
				state.isLoading = false
			})
			.addCase(getAllPosts.rejected, (state, action) => {
				state.error = action.payload
				state.isLoading = false
			})
			.addCase(getUsersPosts.pending, state => {
				state.isLoading = true
			})
			.addCase(getUsersPosts.fulfilled, (state, action) => {
				state.userPosts = action.payload
				state.isLoading = false
			})
			.addCase(getUsersPosts.rejected, (state, action) => {
				state.error = action.payload
				state.isLoading = false
			})
	},
})

export default postsSlice.reducer
