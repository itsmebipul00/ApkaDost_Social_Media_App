import { Fragment, useState } from 'react'

import { MdiEyeSettings } from '../Icones'

function Input(props) {
	const {
		id,
		className,
		required,
		onChange,
		placeholder,
		name,
		value,
		type,
		labelText,
	} = props

	const [visible, setVisibility] = useState(false)

	const toggleVisibility = () => setVisibility(prev => !prev)

	return (
		<Fragment>
			<label htmlFor={id}>
				<input
					id={id}
					className={className}
					required={required}
					onChange={onChange}
					placeholder={placeholder}
					name={name}
					value={value}
					type={visible ? 'text' : type}
				/>
				<span>
					{(type === 'checkbox' || type === 'radio') && labelText}
				</span>
			</label>
			{type === 'password' && (
				<MdiEyeSettings onClick={toggleVisibility} />
			)}
		</Fragment>
	)
}

export default Input
