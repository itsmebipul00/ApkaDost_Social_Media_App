export const generateUserInfo = data => {
	const userInfo = localStorage.getItem('userInfo')
		? JSON.parse(localStorage.getItem('userInfo'))
		: null

	let config
	if (data === 'formdata') {
		config = {
			headers: {
				Authorization: `Bearer ${userInfo?.token}`,
				'Content-type': 'multipart/form-data',
			},
		}
	} else if (data === 'json') {
		config = {
			headers: {
				Authorization: `Bearer ${userInfo?.token}`,
				'Content-type': 'application/json',
			},
		}
	} else {
		config = {
			headers: {
				Authorization: `Bearer ${userInfo?.token}`,
			},
		}
	}

	return [config, userInfo]
}
