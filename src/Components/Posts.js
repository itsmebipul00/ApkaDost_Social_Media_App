import {
	MdiCardsHeartOutline,
	MdiCommentMultipleOutline,
	PhShareNetwork,
	MaterialSymbolsArchiveOutline,
	CarbonBookmarkAdd,
	IcOutlineModeEdit,
	MaterialSymbolsDeleteOutline,
} from '../Icones'

import { StyledPost } from '../Components'

import { useNavigate, useParams } from 'react-router-dom'
import { generateUserInfo } from '../utils/generateUserInfo'

import { useModal } from '../Providers/ModalProvider'

import { Fragment } from 'react'

const Posts = props => {
	const { post, handleLikes, isPostPage, handleDeletePost } = props

	const navigate = useNavigate()

	const { id } = useParams()

	const { setModal, setNewPost, setIsItAnEdit, setPostId } =
		useModal()

	// eslint-disable-next-line no-unused-vars
	const [config, userInfo] = generateUserInfo()

	const isUserOnHisProfile = id === userInfo._id ? true : false

	const handleUser = (e, id) => {
		e.stopPropagation()
		navigate(`/userProfile/${id}`)
	}

	const handleEdit = content => {
		setModal(true)
		setIsItAnEdit(true)
		setPostId(post?._id)
		setNewPost(prev => {
			return {
				...prev,
				postText: content.text,
			}
		})
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
			<div
				className='post-details'
				onClick={() => navigate(`/post/${post?._id}`)}>
				<span className='postedBy-info'>
					<button
						onClick={e => handleUser(e, post?.user?._id)}
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

				{!isPostPage && (
					<span
						className='cta-btns'
						onClick={e => e.stopPropagation()}>
						<span className='heart'>
							<MdiCardsHeartOutline
								onClick={() => handleLikes(post?._id)}
							/>
							{post?.likes?.length}
						</span>

						<span className='comments'>
							<MdiCommentMultipleOutline
								onClick={() => navigate(`/post/${post?._id}`)}
							/>
							{post?.comments?.length}
						</span>

						<PhShareNetwork
							onClick={() =>
								navigator.clipboard.writeText(
									`${window.location.origin}/post/${post?._id}`
								)
							}
						/>
						<MaterialSymbolsArchiveOutline />
						<CarbonBookmarkAdd />
						{isUserOnHisProfile && (
							<Fragment>
								<IcOutlineModeEdit
									onClick={() => handleEdit(post?.content)}
								/>
								<MaterialSymbolsDeleteOutline
									onClick={() => handleDeletePost(post?._id)}
								/>
							</Fragment>
						)}
					</span>
				)}
			</div>
		</StyledPost>
	)
}

export default Posts
