import { useSelector, useDispatch } from 'react-redux'

import { Fragment, useEffect } from 'react'

import {
	getAllPosts,
	likePost,
	unlikePost,
	bookmarkPost,
	removeBookMark,
} from '../Features/postsSlice'

import { Posts } from '../Components'

import { useModal } from '../Providers/ModalProvider'
import Loader from './Loader'

function AllPosts() {
	const allPosts = useSelector(state => state?.posts?.allPosts)

	const isLiked = useSelector(state => state?.posts?.isLiked)

	const isUnliked = useSelector(state => state?.posts?.isUnliked)

	const userId = useSelector(state => state?.auth?.user?._id)

	const pageNo = useSelector(state => state?.posts?.pageNo)

	const isAllPostsLoading = useSelector(
		state => state?.posts?.isLoading
	)

	const removePostBookMark = useSelector(
		state => state?.posts?.removePostBookMark
	)

	const postBookMarked = useSelector(
		state => state?.posts?.postBookMarked
	)

	const { modal } = useModal()

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getAllPosts(pageNo))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		modal,
		dispatch,
		isLiked,
		isUnliked,
		removePostBookMark,
		postBookMarked,
	])

	const handleLikes = id => {
		const post = allPosts.find(post => post._id === id)
		const isLiked = post.likes.find(_id => _id === userId)
		if (!isLiked) {
			dispatch(likePost(id))
		} else {
			dispatch(unlikePost(id))
		}
	}

	const handleBookMarks = id => {
		const post = allPosts?.find(post => post._id === id)
		const isInBookMark = post?.bookmarks?.includes(userId)

		if (!isInBookMark) {
			dispatch(bookmarkPost(id))
		} else {
			dispatch(removeBookMark(id))
		}
	}

	return (
		<Fragment>
			{isAllPostsLoading && <Loader />}
			{allPosts
				.slice(0)
				.reverse()
				.map((post, idx) => (
					<Posts
						key={idx}
						post={post}
						handleLikes={handleLikes}
						handleBookMarks={handleBookMarks}
					/>
				))}
		</Fragment>
	)
}

export default AllPosts
