const {
	REACT_APP_MODE,
	REACT_APP_PRODCUTION_API,
	REACT_APP_DEVELOPMENT_API,
} = process.env

export const API =
	REACT_APP_MODE === 'development'
		? `${REACT_APP_DEVELOPMENT_API}`
		: `${REACT_APP_PRODCUTION_API}`

export const randomImgAPI = 'https://picsum.photos/200'
