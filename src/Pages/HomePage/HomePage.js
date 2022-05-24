import {
	bookmarkPost,
	getUserFeed,
	getUsersPosts,
	removeBookMark,
} from '../../Features/postsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Fragment, useEffect } from 'react'
import { Posts, Loader } from '../../Components'
import { useLocalStorage } from '../../Hooks'
import {
	likePost,
	unlikePost,
	sortByTrending,
	sortByRecent,
} from '../../Features/postsSlice'

import { StyledFilters } from './styles/Filters.styled'
import toast from 'react-hot-toast'
function HomePage() {
	const userId = useSelector(state => state?.auth?.user?._id)

	const userFeed = useSelector(state => state?.posts?.userFeed)

	const isLiked = useSelector(state => state?.posts?.isLiked)

	const isUnliked = useSelector(state => state?.posts?.isUnliked)

	const sortBy = useSelector(state => state?.posts?.sortBy)

	const isUserPostLoading = useSelector(
		state => state?.posts?.isLoading
	)

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

	// eslint-disable-next-line no-unused-vars
	const [_, setSortBy] = useLocalStorage('sortBy', sortBy)

	const selectSortBy = value => {
		setSortBy(value)
		if (value === 'trending') {
			dispatch(sortByTrending())
			toast.success('Sorted by Trending')
		} else {
			dispatch(sortByRecent())
			toast.success('Sorted by Recent')
		}
	}

	return (
		<Fragment>
			{isUserPostLoading && <Loader />}
			<StyledFilters role='list'>
				<label htmlFor='newest'>
					<input
						type='radio'
						id='newest'
						value='newest'
						className='radio'
						name='sort'
						checked={sortBy === 'newest'}
						onChange={e => selectSortBy(e.target.value)}
					/>
					<span className='text'>Recent</span>
				</label>

				<label htmlFor='trending'>
					<input
						type='radio'
						id='trending'
						value='trending'
						className='radio'
						name='sort'
						checked={sortBy === 'trending'}
						onChange={e => selectSortBy(e.target.value)}
					/>
					<span className='text'>Trending</span>
				</label>
			</StyledFilters>
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
