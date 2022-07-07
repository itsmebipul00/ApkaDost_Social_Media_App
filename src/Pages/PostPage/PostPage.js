import { useEffect, Fragment, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { useLocation } from 'react-router-dom'
import {
	getPost,
	likePost,
	unlikePost,
} from '../../Features/postsSlice'

import { StyledReplyBox } from '../../Components'

import { Posts } from '../../Components'

import { API } from '../../utils/api'

import { generateUserInfo } from '../../utils/generateUserInfo'

import axios from 'axios'
import { getUserInfo } from '../../Features/userSlice'
import toast from 'react-hot-toast'

const PostPage = () => {
	const location = useLocation()

	const dispatch = useDispatch()

	const post = useSelector(state => state?.posts?.post)

	const userId = useSelector(state => state?.auth?.user._id)

	const isLiked = useSelector(state => state?.posts?.isLiked)

	const isUnliked = useSelector(state => state?.posts?.isUnliked)

	const userDetails = useSelector(state => state?.auth?.userDetails)

	const postId = location.pathname.split('/')[2]

	const [reply, setReply] = useState('')

	const [replies, setReplies] = useState([])

	useEffect(() => {
		dispatch(getUserInfo(userId))
		dispatch(getPost(postId))
		getReplies(post?._id)
	}, [dispatch, postId, isLiked, isUnliked, post?._id, userId])

	const handleLikes = id => {
		const isLiked = post.likes.find(_id => _id === userId)
		if (!isLiked) {
			dispatch(likePost(id))
		} else {
			dispatch(unlikePost(id))
		}
	}

	const handleBtnClick = async id => {
		const [config] = generateUserInfo('json')

		const res = await axios.post(
			`${API}/api/posts/replies/${id}/${userId}`,
			{ reply },
			config
		)

		if (res.data) {
			setReply('')

			dispatch(getPost(postId))

			if (post) {
				getReplies(post?._id)
			}
		}
		toast.success('Comment Posted')
	}

	const getReplies = async id => {
		try {
			const [config] = generateUserInfo()
			const res = await axios.get(
				`${API}/api/posts/replies/${id}`,
				config
			)

			setReplies(res.data)
		} catch (error) {
			throw error
		}
	}

	return (
		<Fragment>
			<Posts post={post} handleLikes={handleLikes} />
			<StyledReplyBox>
				<div className='dp-wrapper'>
					<img
						src={
							userDetails?.profilePic === undefined
								? `${window.location.origin}/images/no-dp.webp`
								: userDetails?.profilePic
						}
						alt={`${post?.user?.username}-dp`}
						className='round-dp'
					/>
				</div>
				<textarea
					className='reply-textarea'
					maxLength={50}
					value={reply}
					onChange={e => setReply(e.target.value)}
				/>
				<button
					disabled={!reply}
					className='reply-btn'
					onClick={() => handleBtnClick(post._id)}>
					Reply
				</button>
			</StyledReplyBox>
			{replies.map((rep, idx) => (
				<Posts
					post={rep}
					key={idx}
					handleLikes={handleLikes}
					isPostPage={true}
				/>
			))}
		</Fragment>
	)
}

export default PostPage
