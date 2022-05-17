import { Input, Button } from '../../Components'

import { useState } from 'react'

import { StyledForm } from './styles/Form.styled'

import { StyledPasswordInput } from '../../Components'

import { Link } from 'react-router-dom'

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

	return (
		<StyledForm onSubmit={handleSubmit}>
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

			<span className='span-flex'>
				<Input
					type='checkbox'
					required={true}
					id='remember'
					name='remember'
					value={formData.remember}
					onChange={handleInput}
					labelText='Remember me'
				/>
				<Link to='/'>Forgot Password ? </Link>
			</span>

			<Button>NEXTXT</Button>
		</StyledForm>
	)
}

export default SignInPage
