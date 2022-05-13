import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import postsService from '../Services/postsServices'

const initialState = {
	allPosts: [],
	isLoading: false,
	error: null,
}

export const createNewPost = createAsyncThunk(
	'posts/createPost',
	async newPost => await postsService.createPost(newPost)
)

export const getAllPosts = createAsyncThunk(
	'posts/allPosts',
	async () => await postsService.getAllPosts()
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
				state.allPosts = action.payload
				state.isLoading = false
			})
			.addCase(getAllPosts.rejected, (state, action) => {
				state.error = action.payload
				state.isLoading = false
			})
	},
})

export default postsSlice.reducer
