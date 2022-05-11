import { API } from '../utils/api'

import axios from 'axios'

const userInfo = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null

const config = {
	headers: {
		Authorization: `Bearer ${userInfo.token}`,
		'Content-type': 'application/json',
	},
}
const postsService = {
	createPost: async newPost => {
		console.log(newPost)
		try {
			const res = await axios.post(
				`${API}/api/posts`,
				newPost,
				config
			)
			return res.data
		} catch (error) {
			throw error
		}
	},
}

export default postsService
