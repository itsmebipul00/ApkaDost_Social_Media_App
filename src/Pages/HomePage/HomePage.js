import { getUserFeed } from '../../Features/postsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Posts, NewPost } from '../../Components'
import { likePost, unlikePost } from '../../Features/postsSlice'
function HomePage() {
	const userId = useSelector(state => state?.auth?.user._id)

	const userFeed = useSelector(state => state?.posts?.userFeed)

	const isLiked = useSelector(state => state?.posts?.isLiked)

	const isUnliked = useSelector(state => state?.posts?.isUnliked)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getUserFeed(userId))
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
		<div>
			<NewPost />

			{userFeed.map((post, key) => (
				<Posts post={post} key={key} handleLikes={handleLikes} />
			))}
		</div>
	)
}

export default HomePage
