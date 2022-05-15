import { useDispatch } from 'react-redux'

import { useNavigate } from 'react-router-dom'

import formatDistance from 'date-fns/formatDistance'

import parseISO from 'date-fns/parseISO'

import {
	MdiCardsHeartOutline,
	MdiCommentMultipleOutline,
	PhShareNetwork,
	MaterialSymbolsArchiveOutline,
	CarbonBookmarkAdd,
} from '../Icones'

import { likePost } from '../Features/userSlice'

import { StyledPost } from '../Components'

const Posts = props => {
	const { post } = props

	const dispatch = useDispatch()

	const toggleLikes = id => {
		dispatch(likePost(id))
	}
	const navigate = useNavigate()

	const handleUser = id => {
		navigate(`/userProfile/${id}`)
	}

	console.log(post)
	return (
		<StyledPost>
			<div className='dp-wrapper'>
				<img
					src={`${window.location.origin}/${post?.user?.profilePic}`}
					alt='user-dp'
					className='profile-dp'
				/>
			</div>
			<div className='post-details'>
				<span className='postedBy-info'>
					<button
						onClick={() => handleUser(post?.user?._id)}
						className='post-user'>
						<p>{post?.user?.username}</p>
					</button>
					{/* <span className='uploaded-on'>
						<IcSharpTimeline />
						<span>
							{formatDistance(parseISO(post?.updatedAt), Date.now(), {
								addSuffix: true,
							})}
						</span>
					</span> */}
				</span>
				<p className='post-content'>{post?.content?.text}</p>
				<span className='cta-btns'>
					<MdiCardsHeartOutline
						onClick={() => toggleLikes(post?._id)}
					/>
					<MdiCommentMultipleOutline />
					<PhShareNetwork />
					<MaterialSymbolsArchiveOutline />
					<CarbonBookmarkAdd />
				</span>
			</div>
		</StyledPost>
	)
}

export default Posts
