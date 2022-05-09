import { StyledButton } from './styles/Button.styled'

function Button(props) {
	const { onClick, className } = props
	return (
		<StyledButton onClick={onClick} className={className}>
			{props.children}
		</StyledButton>
	)
}

export default Button
