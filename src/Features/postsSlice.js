import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import postsService from '../Services/postsServices'

const initialState = {
	posts: [],
	isLoading: false,
	error: null,
}

export const createNewPost = createAsyncThunk(
	'posts/createPost',
	async newPost => {
		// console.log(newPost)
		return postsService.createPost(newPost)
	}
)

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	extraReducers(builder) {
		builder
			.addCase(createNewPost.pending, state => {
				state.isLoading = true
			})
			.addCase(createNewPost.fulfilled, (state, action) => {
				state.posts = action.payload
				state.isLoading = false
			})
			.addCase(createNewPost.rejected, (state, action) => {
				state.error = action.payload
				state.isLoading = false
			})
	},
})

export default postsSlice.reducer
