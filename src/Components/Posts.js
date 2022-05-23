import {
	MdiCardsHeartOutline,
	MdiCommentMultipleOutline,
	PhShareNetwork,
	MdiArchivePlus,
	MdiArchiveRemove,
	CarbonBookmarkAdd,
	IcOutlineModeEdit,
	MaterialSymbolsDeleteOutline,
	IcSharpBookmarkRemove,
	IcSharpTimeline,
} from '../Icones'

import { StyledPost } from '../Components'

import { useLocation, useNavigate } from 'react-router-dom'
import { generateUserInfo } from '../utils/generateUserInfo'

import { useModal } from '../Providers/ModalProvider'

import { Fragment } from 'react'

import { randomImgAPI } from '../utils/api'

import toast from 'react-hot-toast'

const Posts = props => {
	const {
		post,
		handleLikes,
		isPostPage,
		handleDeletePost,
		handleBookMarks,
		archivePost,
		removeFromArchive,
		isItDraftPage,
		handleDraft,
		deleteDraft,
	} = props

	const navigate = useNavigate()

	const {
		setModal,
		setNewPost,
		setIsItAnEdit,
		setPostId,
		setPreview,
	} = useModal()

	// eslint-disable-next-line no-unused-vars
	const [config, userInfo] = generateUserInfo()

	const handleUser = (e, id) => {
		e.stopPropagation()
		navigate(`/user/${id}`)
	}

	const handleEdit = content => {
		console.log(content)
		setModal(true)
		setIsItAnEdit(true)
		setPreview(content?.image)
		setPostId(post?._id)
		setNewPost(prev => {
			return {
				...prev,
				postText: content?.text,
				file: content?.image,
			}
		})
	}

	const copyLink = () => {
		navigator.clipboard.writeText(
			`${window.location.origin}/post/${post?._id}`
		)
		toast.success('Link Copied')
	}
	const location = useLocation()

	const isItUsersProfile =
		`${location.pathname}` === `/user/${userInfo._id}`

	console.log(`/user/${userInfo._id}`, `${location.pathname}`)

	return (
		<StyledPost>
			<div className='dp-wrapper'>
				<img
					src={`${
						post?.user?.profilePic === 'null'
							? `${randomImgAPI}/400/400`
							: post?.user?.profilePic
					}`}
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
					<span className='uploaded-on'>
						<IcSharpTimeline />
						{new Date(post?.createdAt)
							?.toString()
							?.split(' ')
							?.slice(1, 3)
							?.join(' ')}
					</span>
				</span>
				<p className='post-content'>{post?.content?.text}</p>
				{post?.content?.image !== 'false' && (
					<img
						src={post?.content?.image}
						alt={`${post?.username}-post`}
						className='post-img'
					/>
				)}

				<span className='cta-btns' onClick={e => e.stopPropagation()}>
					{!isPostPage && !isItDraftPage && (
						<Fragment>
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

							<PhShareNetwork onClick={copyLink} />

							{post?.bookmarks?.includes(userInfo._id) ? (
								<IcSharpBookmarkRemove
									onClick={() => handleBookMarks(post?._id)}
								/>
							) : (
								<CarbonBookmarkAdd
									onClick={() => handleBookMarks(post?._id)}
								/>
							)}

							{isItUsersProfile && (
								<Fragment>
									<IcOutlineModeEdit
										onClick={() => handleEdit(post?.content)}
									/>
									<MaterialSymbolsDeleteOutline
										onClick={() => handleDeletePost(post?._id)}
									/>
									{post?.archived ? (
										<MdiArchiveRemove
											onClick={() => removeFromArchive(post?._id)}
										/>
									) : (
										<MdiArchivePlus
											onClick={() => archivePost(post?._id)}
										/>
									)}
								</Fragment>
							)}
						</Fragment>
					)}
					{isItDraftPage && (
						<Fragment>
							<IcOutlineModeEdit onClick={() => handleDraft(post)} />
							<MaterialSymbolsDeleteOutline
								onClick={() => deleteDraft(post?._id)}
							/>
						</Fragment>
					)}
				</span>
			</div>
		</StyledPost>
	)
}

export default Posts
