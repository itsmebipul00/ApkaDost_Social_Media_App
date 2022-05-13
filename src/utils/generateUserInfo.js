export const generateUserInfo = () => {
	const userInfo = localStorage.getItem('userInfo')
		? JSON.parse(localStorage.getItem('userInfo'))
		: null

	const config = {
		headers: {
			Authorization: `Bearer ${userInfo?.token}`,
			'Content-type': 'multipart/form-data',
		},
	}

	return [config, userInfo]
}
