import { getUserFeed, getUsersPosts } from '../../Features/postsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Fragment, useEffect } from 'react'
import { Posts } from '../../Components'
import { likePost, unlikePost } from '../../Features/postsSlice'
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
		const post = userFeed.find(post => post._id === id)
		const isLiked = post.likes.find(_id => _id === userId)

		if (!isLiked) {
			dispatch(likePost(id))
		} else {
			dispatch(unlikePost(id))
		}
	}

	return (
		<Fragment>
			{userFeed.map((post, key) => (
				<Posts post={post} key={key} handleLikes={handleLikes} />
			))}
		</Fragment>
	)
}

export default HomePage
