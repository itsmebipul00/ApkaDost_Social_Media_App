import { API } from '../utils/api'

import { generateUserInfo } from '../utils/generateUserInfo'

import axios from 'axios'

const userService = {
	likePost: async postId => {
		const [config, userInfo] = generateUserInfo('json')

		try {
			const res = await axios.post(
				`${API}/api/users/${postId}/${userInfo._id}`,
				{},
				config
			)
			return res.data
		} catch (error) {
			throw error
		}
	},
	authUser: async formData => {
		const { username, email, password } = formData

		const [config] = generateUserInfo('json')

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
	},
	getUserInfo: async id => {
		// const { username, email, password } = formData
		console.log(id)
		const [config] = generateUserInfo()

		try {
			const res = await axios.get(`${API}/api/users/${id}`, config)

			return res.data
		} catch (error) {
			throw error
		}
	},
}

export default userService
