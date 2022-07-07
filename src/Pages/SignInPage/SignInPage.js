import { Input, Button } from '../../Components'

import { useState } from 'react'

import { StyledForm } from './styles/Form.styled'

import { StyledPasswordInput } from '../../Components'

import { authUser } from '../../Features/userSlice'
import { useDispatch } from 'react-redux'

function SignInPage() {
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		remember: false,
	})

	const dispatch = useDispatch()

	const handleInput = e => {
		e.preventDefault()
		const { name, value, checked, type } = e.target
		setFormData(prev => {
			return {
				...prev,
				username: prev.email.split('@')[0],
				[name]: type === 'checkbox' ? checked : value,
			}
		})
	}

	const handleSubmit = e => {
		e.preventDefault()
		dispatch(authUser(formData))
		setFormData({
			email: '',
			password: '',
			remember: false,
		})
	}
	const fillGuestDetails = e => {
		e.preventDefault()
		setFormData({
			email: 'admin@example.com',
			password: '123456',
		})
	}

	return (
		<StyledForm onSubmit={handleSubmit}>
			<h3 className='login-header'>Apka Dost</h3>
			<Input
				type='email'
				placeholder='Enter Email'
				required={true}
				id='email'
				name='email'
				value={formData.email}
				onChange={handleInput}
			/>
			<StyledPasswordInput>
				<Input
					type='password'
					placeholder='Enter Password'
					required={true}
					id='password'
					name='password'
					value={formData.password}
					onChange={handleInput}
				/>
			</StyledPasswordInput>

			<Button onClick={handleSubmit}>Login</Button>
			<Button onClick={fillGuestDetails}>Guest Credentials</Button>
		</StyledForm>
	)
}

export default SignInPage
