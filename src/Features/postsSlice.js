import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import postsService from '../Services/postsServices'

import toast from 'react-hot-toast'

const sortFromLocalStorage =
	localStorage.getItem('sortBy') ?? 'newest'

const initialState = {
	allPosts: [],
	isLoading: false,
	error: null,
	userPosts: [],
	userFeed: [],
	post: [],
	sortBy: sortFromLocalStorage,
	pageNo: 1,
	totalPages: null,
}

export const createNewPost = createAsyncThunk(
	'posts/createPost',
	async newPost => await postsService.createPost(newPost)
)

export const getAllPosts = createAsyncThunk(
	'posts/allPosts',
	async pgNumber => await postsService.getAllPosts(pgNumber)
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

export const getPost = createAsyncThunk(
	'posts/postId',
	async id => await postsService.getPost(id)
)

export const bookmarkPost = createAsyncThunk(
	'posts/bookmark',
	async postId => await postsService.bookmarkPost(postId)
)

export const removeBookMark = createAsyncThunk(
	'posts/removeBookmark',
	async postId => await postsService.removeBookMark(postId)
)

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		sortByTrending: state => {
			state.userFeed = state.userFeed.sort(
				(x, y) => y.likes.length - x.likes.length
			)
		},
		sortByRecent: state => {
			state.userFeed = state.userFeed.sort(
				(x, y) => new Date(y?.createdAt) - new Date(x?.createdAt)
			)
		},
		sortByOldest: state => {
			state.userFeed = state.userFeed.sort(
				(x, y) => new Date(y?.createdAt) - new Date(x?.createdAt)
			)
		},
	},
	extraReducers(builder) {
		builder
			.addCase(getAllPosts.pending, state => {
				state.isLoading = true
			})
			.addCase(getAllPosts.fulfilled, (state, action) => {
				state.totalPages = action.payload.slice(-2)[0]
				state.pageNo = action.payload.slice(-2)[1]
				state.allPosts = action.payload.slice(0, -2)
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
				toast.success('Liked Post')
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
				toast.success('Post Unliked')
			})
			.addCase(unlikePost.rejected, state => {
				state.isUnliked = false
				state.isLoading = false
			})
			.addCase(getPost.fulfilled, (state, action) => {
				state.post = action.payload
				state.isLoading = false
			})
			.addCase(bookmarkPost.pending, state => {
				state.postBookMarked = false
				state.isLoading = false
			})
			.addCase(bookmarkPost.fulfilled, state => {
				state.postBookMarked = true
				state.isLoading = false
				toast.success('Added to bookmark')
			})
			.addCase(bookmarkPost.rejected, state => {
				state.postBookMarked = false
				state.isLoading = false
			})
			.addCase(removeBookMark.pending, state => {
				state.removePostBookMark = false
				state.isLoading = false
				state.isremovedFromBookmark = false
			})
			.addCase(removeBookMark.fulfilled, state => {
				state.removePostBookMark = true
				state.isLoading = false
				state.isremovedFromBookmark = true
				toast.success('Removed from bookmark')
			})
			.addCase(removeBookMark.rejected, state => {
				state.removePostBookMark = false
				state.isLoading = false
				state.isremovedFromBookmark = false
			})
			.addCase(createNewPost.fulfilled, state => {
				state.isNewPostCreated = true
				state.isLoading = false
				toast.success('New Post Created')
			})
	},
})

export const { sortByTrending, sortByRecent, sortByOldest } =
	postsSlice.actions

export default postsSlice.reducer
