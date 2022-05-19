import { useState, useEffect } from 'react'

function useLocalStorage(key, initialValue) {
	const jsonString = localStorage.getItem(key)

	console.log(jsonString)

	const initialState = () => {
		if (jsonString !== null) return JSON.parse(jsonString)
		return initialValue
	}

	const [value, setValue] = useState(initialState)

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value))
	}, [key, value])

	return [value, setValue]
}

export default useLocalStorage
