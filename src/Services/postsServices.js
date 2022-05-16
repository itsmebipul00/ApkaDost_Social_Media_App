import { API } from '../utils/api'

import { generateUserInfo } from '../utils/generateUserInfo'

import axios from 'axios'

const postsService = {
	createPost: async newPost => {
		const [config, userInfo] = generateUserInfo('formdata')
		console.log(userInfo._id, API, newPost)
		try {
			const res = await axios.post(
				`${API}/api/posts/${userInfo._id}`,
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
	toggleLikes: async id => {
		const [config, userInfo] = generateUserInfo()
		try {
			const res = await axios.put(
				`${API}/api/posts/toggleLikes/${id}/${userInfo._id}`,
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
	getAllPosts: async () => {
		const [config] = generateUserInfo()

		try {
			const res = await axios.get(`${API}/api/posts/`, config)
			return res.data
		} catch (error) {
			throw error
		}
	},
}

export default postsService
