import { useSelector, useDispatch } from 'react-redux'

import { Fragment, useEffect } from 'react'

import { getAllPosts, toggleLikes } from '../Features/postsSlice'

import { Posts } from '../Components'

import { useModal } from '../Providers/ModalProvider'

function AllPosts() {
	const posts = useSelector(state => state.posts)

	const { allPosts } = posts

	const { modal } = useModal()

	const dispatch = useDispatch()

	const handleLikes = id => {
		dispatch(toggleLikes(id))
		dispatch(getAllPosts())
	}

	useEffect(() => {
		dispatch(getAllPosts())
	}, [modal, dispatch])

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
