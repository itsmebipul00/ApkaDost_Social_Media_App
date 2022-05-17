import { useNavigate } from 'react-router-dom'

import {
	MdiCardsHeartOutline,
	MdiCommentMultipleOutline,
	PhShareNetwork,
	MaterialSymbolsArchiveOutline,
	CarbonBookmarkAdd,
} from '../Icones'

import { StyledPost } from '../Components'

const Posts = props => {
	const { post, handleLikes } = props

	const navigate = useNavigate()

	const handleUser = id => {
		navigate(`/userProfile/${id}`)
	}

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
					{/* Future reference */}
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
					<span className='heart'>
						<MdiCardsHeartOutline
							onClick={() => handleLikes(post?._id)}
						/>
						{post?.likes?.length > 0 &&
							(post?.likes?.length === 1
								? `${post?.likes?.length} like`
								: `${post?.likes?.length} likes`)}
					</span>

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
