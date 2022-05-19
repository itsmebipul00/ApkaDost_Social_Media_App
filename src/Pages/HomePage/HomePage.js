import {
	bookmarkPost,
	getUserFeed,
	getUsersPosts,
	removeBookMark,
} from '../../Features/postsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Fragment, useEffect } from 'react'
import { Posts } from '../../Components'
import { likePost, unlikePost } from '../../Features/postsSlice'
import { generateUserInfo } from '../../utils/generateUserInfo'
function HomePage() {
	const userId = useSelector(state => state?.auth?.user?._id)

	const userFeed = useSelector(state => state?.posts?.userFeed)

	const isLiked = useSelector(state => state?.posts?.isLiked)

	const isUnliked = useSelector(state => state?.posts?.isUnliked)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getUserFeed(userId))
		dispatch(getUsersPosts(userId))

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userId, isLiked, dispatch, isUnliked])

	const handleLikes = id => {
		const post = userFeed?.find(post => post?._id === id)
		const isLiked = post?.likes?.includes(userId)

		if (!isLiked) {
			dispatch(likePost(id))
		} else {
			dispatch(unlikePost(id))
		}
	}

	console.log(userFeed)

	// eslint-disable-next-line no-unused-vars
	// const [config, userInfo] = generateUserInfo()

	const handleBookMarks = id => {
		const post = userFeed?.find(post => post?._id === id)
		const isInBookMark = post?.bookmarks?.includes(userId)

		if (!isInBookMark) {
			dispatch(bookmarkPost(id))
		} else {
			dispatch(removeBookMark(id))
		}

		dispatch(getUserFeed(userId))
	}

	return (
		<Fragment>
			{userFeed.map((post, key) => (
				<Posts
					post={post}
					key={key}
					handleLikes={handleLikes}
					handleBookMarks={handleBookMarks}
				/>
			))}
		</Fragment>
	)
}

export default HomePage
