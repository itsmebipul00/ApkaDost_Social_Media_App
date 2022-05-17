import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import postsService from '../Services/postsServices'

const initialState = {
	allPosts: [],
	isLoading: false,
	error: null,
	userPosts: [],
	userFeed: [],
}

export const createNewPost = createAsyncThunk(
	'posts/createPost',
	async newPost => await postsService.createPost(newPost)
)

export const getAllPosts = createAsyncThunk(
	'posts/allPosts',
	async () => await postsService.getAllPosts()
)

export const likePost = createAsyncThunk(
	'posts/likePost',
	async id => await postsService.likePost(id)
)

export const unlikePost = createAsyncThunk(
	'posts/unlikePost',
	async id => await postsService.unlikePost(id)
)

export const getUsersPosts = createAsyncThunk(
	'posts/user',
	async id => await postsService.getUserPosts(id)
)

export const getUserFeed = createAsyncThunk(
	'posts/userFeed',
	async id => await postsService.getUserFeed(id)
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
			.addCase(getUserFeed.pending, state => {
				state.isLoading = true
			})
			.addCase(getUserFeed.fulfilled, (state, action) => {
				state.userFeed = action.payload
				state.isLoading = false
			})
			.addCase(getUserFeed.rejected, (state, action) => {
				state.error = action.payload
				state.isLoading = false
			})
			.addCase(likePost.pending, state => {
				state.isLiked = false
				state.isLoading = false
			})
			.addCase(likePost.fulfilled, state => {
				state.isLiked = true
				state.isLoading = false
			})
			.addCase(likePost.rejected, state => {
				state.isLiked = false
				state.isLoading = false
			})
			.addCase(unlikePost.pending, state => {
				state.isUnliked = false
				state.isLoading = false
			})
			.addCase(unlikePost.fulfilled, state => {
				state.isUnliked = true
				state.isLoading = false
			})
			.addCase(unlikePost.rejected, state => {
				state.isUnliked = false
				state.isLoading = false
			})
	},
})

export default postsSlice.reducer
