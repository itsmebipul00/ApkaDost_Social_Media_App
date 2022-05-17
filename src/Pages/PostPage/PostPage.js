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

const PostPage = () => {
	const location = useLocation()

	const dispatch = useDispatch()

	const post = useSelector(state => state?.posts?.post)

	const userId = useSelector(state => state?.auth?.user._id)

	const isLiked = useSelector(state => state?.posts?.isLiked)

	const isUnliked = useSelector(state => state?.posts?.isUnliked)

	const postId = location.pathname.split('/')[2]

	const [reply, setReply] = useState('')

	useEffect(() => {
		dispatch(getPost(postId))
	}, [dispatch, postId, isLiked, isUnliked])

	const handleLikes = id => {
		const isLiked = post.likes.find(_id => _id === userId)
		if (!isLiked) {
			dispatch(likePost(id))
		} else {
			dispatch(unlikePost(id))
		}
	}

	const handleBtnClick = id => {
		console.log(id)
	}

	return (
		<Fragment>
			<Posts post={post} handleLikes={handleLikes} />
			<StyledReplyBox>
				<div className='dp-wrapper'>
					<img
						src={`${window.location.origin}/${post?.user?.profilePic}`}
						alt={`${post?.user?.username}-dp`}
						className='round-dp'
					/>
				</div>
				<textarea
					className='reply-textarea'
					maxLength={50}
					onChange={e => setReply(e.target.value)}
				/>
				<button
					disabled={!reply}
					className='reply-btn'
					onClick={() => handleBtnClick(post._id)}>
					Reply
				</button>
			</StyledReplyBox>
		</Fragment>
	)
}

export default PostPage
