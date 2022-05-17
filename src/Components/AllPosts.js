import { useSelector, useDispatch } from 'react-redux'

import { Fragment, useEffect } from 'react'

import {
	getAllPosts,
	likePost,
	unlikePost,
} from '../Features/postsSlice'

import { Posts } from '../Components'

import { useModal } from '../Providers/ModalProvider'

function AllPosts() {
	const posts = useSelector(state => state.posts)

	const userId = useSelector(state => state.auth.user._id)

	const { allPosts, isLiked, isUnliked } = posts

	const { modal } = useModal()

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getAllPosts())
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [modal, dispatch, isLiked, isUnliked])

	const handleLikes = id => {
		const post = allPosts.find(post => post._id === id)
		const isLiked = post.likes.find(_id => _id === userId)
		if (!isLiked) {
			dispatch(likePost(id))
		} else {
			dispatch(unlikePost(id))
		}
	}

	return (
		<Fragment>
			{allPosts
				.slice(0)
				.reverse()
				.map((post, idx) => (
					<Posts key={idx} post={post} handleLikes={handleLikes} />
				))}
		</Fragment>
	)
}

export default AllPosts
