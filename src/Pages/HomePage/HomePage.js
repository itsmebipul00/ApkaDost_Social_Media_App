// import { Header } from '../../Components'
import { getUserFeed } from '../../Features/postsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Posts } from '../../Components'
function HomePage() {
	const userId = useSelector(state => state?.auth?.user._id)

	const userFeed = useSelector(state => state?.posts?.userFeed)

	console.log(userFeed)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getUserFeed(userId))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userId])
	return (
		<div>
			{userFeed.map((post, key) => (
				<Posts post={post} />
			))}
		</div>
	)
}

export default HomePage
