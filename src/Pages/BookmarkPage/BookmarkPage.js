import { StyleBookmarks } from './BookmarkPage.styled'
import { useEffect, Fragment } from 'react'
import { Loader, Posts } from '../../Components'

import { generateUserInfo } from '../../utils/generateUserInfo'
import { useDispatch, useSelector } from 'react-redux'

import {
	likePost,
	unlikePost,
	removeBookMark,
} from '../../Features/postsSlice'

import { getBookmarks } from '../../Features/userSlice'
import { useNavigate } from 'react-router-dom'

const Bookmarks = () => {
	// eslint-disable-next-line no-unused-vars
	const [_, userInfo] = generateUserInfo()

	const { _id } = userInfo

	const isLiked = useSelector(state => state?.posts?.isLiked)

	const isUnliked = useSelector(state => state?.posts?.isUnliked)

	const isremovedFromBookmark = useSelector(
		state => state?.posts?.isremovedFromBookmark
	)

	const bookmarks = useSelector(state => state?.auth?.bookmarks)

	const isBookmarksLoading = useSelector(
		state => state?.auth.isLoading
	)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getBookmarks(userInfo?._id))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		isLiked,
		isUnliked,
		dispatch,
		userInfo?.id,
		isremovedFromBookmark,
	])

	const handleLikes = id => {
		const post = bookmarks?.find(post => post?._id === id)
		const isLiked = post?.likes?.includes(_id)

		if (!isLiked) {
			dispatch(likePost(id))
		} else {
			dispatch(unlikePost(id))
		}
	}

	const handleBookMarks = id => {
		dispatch(removeBookMark(id))
	}

	const navigate = useNavigate()

	return (
		<Fragment>
			{isBookmarksLoading && <Loader />}
			{bookmarks?.length > 0 ? (
				bookmarks?.map((book, key) => (
					<Posts
						post={book}
						key={key}
						handleLikes={handleLikes}
						handleBookMarks={handleBookMarks}
					/>
				))
			) : (
				<StyleBookmarks className='no-bookmark'>
					<img
						src={`${window.location.origin}/images/empty-bookmark.png`}
						alt='no-bookmark'
						className='empty-feed'
					/>
					<p className='empty-feed-text'>
						Bookmark your favourite posts and read them again from
						here
					</p>
					<button
						className='btn-explore'
						onClick={() => navigate('/explore')}>
						Explore
					</button>
				</StyleBookmarks>
			)}
		</Fragment>
	)
}

export default Bookmarks
