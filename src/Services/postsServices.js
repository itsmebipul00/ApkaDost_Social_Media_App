import { API } from '../utils/api'

import { generateUserInfo } from '../utils/generateUserInfo'

import axios from 'axios'

const postsService = {
	createPost: async newPost => {
		const [config, userInfo] = generateUserInfo('formdata')
		try {
			const res = await axios.post(
				`${API}/api/posts/${userInfo?._id}`,
				newPost,
				config
			)
			return res.data
		} catch (error) {
			throw error
		}
	},
	getUserPosts: async id => {
		const [config] = generateUserInfo()
		try {
			const res = await axios.get(
				`${API}/api/posts/user/${id}`,
				config
			)
			return res.data
		} catch (error) {
			throw error
		}
	},
	getUserFeed: async id => {
		const [config] = generateUserInfo()
		try {
			const res = await axios.get(
				`${API}/api/posts/userFeed/${id}`,
				config
			)
			return res.data
		} catch (error) {
			throw error
		}
	},
	likePost: async id => {
		const [config, userInfo] = generateUserInfo()
		try {
			const res = await axios.put(
				`${API}/api/posts/like/${id}/${userInfo?._id}`,
				{},
				config
			)
			return res.data
		} catch (error) {
			throw error
		}
	},
	unlikePost: async id => {
		const [config, userInfo] = generateUserInfo()
		try {
			const res = await axios.put(
				`${API}/api/posts/unlike/${id}/${userInfo?._id}`,
				{},
				config
			)
			return res.data
		} catch (error) {
			throw error
		}
	},

	bookmarkPost: async postId => {
		const [config, userInfo] = generateUserInfo()

		try {
			const res = await axios.put(
				`${API}/api/posts/bookmark/${postId}/${userInfo?._id}`,
				{},
				config
			)
			return res.data
		} catch (error) {
			throw error
		}
	},

	removeBookMark: async postId => {
		const [config, userInfo] = generateUserInfo()

		try {
			const res = await axios.put(
				`${API}/api/posts/removeBookmark/${postId}/${userInfo?._id}`,
				{},
				config
			)
			return res.data
		} catch (error) {
			throw error
		}
	},

	//Later
	// draftPost: async newPost => {
	// 	const config = generateUserInfo()

	// 	try {
	// 		const res = await axios.post(
	// 			`${API}/api/posts/draft/${userInfo._id}`,
	// 			newPost,
	// 			config
	// 		)
	// 		return res.data
	// 	} catch (error) {
	// 		throw error
	// 	}
	// },
	getAllPosts: async pgNumber => {
		const [config] = generateUserInfo()

		try {
			const res = await axios.get(
				`${API}/api/posts?pgNumber=${pgNumber}`,
				config
			)
			return res.data
		} catch (error) {
			throw error
		}
	},
	getPost: async id => {
		const [config] = generateUserInfo()
		try {
			const res = await axios.get(`${API}/api/posts/${id}`, config)
			return res.data
		} catch (error) {
			throw error
		}
	},
}

export default postsService
