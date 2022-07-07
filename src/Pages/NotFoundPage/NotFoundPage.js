import { useNavigate } from 'react-router-dom'
import { StyledNotFound } from './NotFound.styled'

const NotFoundScreen = () => {
	const navigate = useNavigate()
	return (
		<StyledNotFound>
			<img
				src='/images/404.gif'
				alt='404-gif'
				className='page-not-found'
			/>
			<button
				className='btn-explore'
				onClick={() => navigate('/explore')}>
				Explore
			</button>
		</StyledNotFound>
	)
}

export default NotFoundScreen
