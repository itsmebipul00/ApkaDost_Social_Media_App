import { Outlet, useLocation, useParams } from 'react-router-dom'
import { generateUserInfo } from '../../utils/generateUserInfo'
import { API } from '../../utils/api'
import { randomImgAPI } from '../../utils/api'
import { StyledProfileSection } from './styles/ProfileSection.styled.js'
import { IcOutlineModeEdit } from '../../Icones'
import { useDispatch, useSelector } from 'react-redux'
import { Posts } from '../../Components'
import axios from 'axios'
import { useEffect } from 'react'
import {
	getUsersPosts,
	bookmarkPost,
	removeBookMark,
} from '../../Features/postsSlice'
import { getUserInfo } from '../../Features/userSlice'
import { likePost, unlikePost } from '../../Features/postsSlice'
import { useModal } from '../../Providers/ModalProvider'

import { Link } from 'react-router-dom'

function ProfilePage() {
	const location = useLocation()
	const isLiked = useSelector(state => state?.posts?.isLiked)

	const isUnliked = useSelector(state => state?.posts?.isUnliked)

	const removePostBookMark = useSelector(
		state => state?.posts?.removePostBookMark
	)

	const postBookMarked = useSelector(
		state => state?.posts?.postBookMarked
	)

	const { id } = useParams()

	const [config, loggedInUser] = generateUserInfo()

	const userId = useSelector(state => state?.auth?.user?._id)

	const userPosts = useSelector(state => state?.posts?.userPosts)

	const userInfo = useSelector(state => state?.auth?.userDetails)

	const dispatch = useDispatch()

	const { modal } = useModal()

	useEffect(() => {
		dispatch(getUserInfo(id))
		if (userInfo?._id) {
			dispatch(getUsersPosts(userInfo?._id))
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		userInfo?._id,
		id,
		isLiked,
		isUnliked,
		modal,
		removePostBookMark,
		postBookMarked,
	])

	const handleFollow = async id => {
		await axios.put(
			`${API}/api/users/follow/${userId}`,
			{ id },
			config
		)
		dispatch(getUserInfo(id))
	}

	const handleDeletePost = async id => {
		await axios.delete(`${API}/api/posts/delete/${id}`, config)

		dispatch(getUsersPosts(userInfo?._id))
	}

	const isFollowed = userInfo?.follower?.find(id => id === userId)

	const handleLikes = id => {
		const post = userPosts?.find(post => post?._id === id)
		const isLiked = post.likes?.includes(userId)

		if (!isLiked) {
			dispatch(likePost(id))
		} else {
			dispatch(unlikePost(id))
		}
	}

	console.log(userPosts)

	const handleBookMarks = id => {
		const post = userPosts?.find(post => post?._id === id)
		const isInBookMark = post?.bookmarks?.includes(userId)

		if (!isInBookMark) {
			dispatch(bookmarkPost(id))
		} else {
			dispatch(removeBookMark(id))
		}
	}

	const isUserOnHisProfile = id === loggedInUser?._id ? true : false

	return (
		<StyledProfileSection>
			<div className='profileInfo-wrapper'>
				<img
					src={`${randomImgAPI}/800/400`}
					alt='user-bgImg'
					className='user-bgImg'
				/>
				<div className='profile-subInfo'>
					<div>
						<div className='profile-pic-wrapper'>
							<img
								src={`${window.location.origin}/${userInfo?.profilePic}`}
								alt='user-profilePic'
								className='user-profilePic'
							/>
						</div>

						<div className='profile-details'>
							<p>{userInfo?.username}</p>
							<p className='user-bio'>{userInfo?.bio}</p>
							<p
								className='user-url'
								onClick={() =>
									navigator.clipboard.writeText(
										`${window.location.origin}${location.pathname}`
									)
								}>
								Profile: <span>{userInfo?.username}.nextxt</span>
							</p>
							<div className='userDetails-wrapper'>
								<p className='follow-count'>
									<span>
										<span className='count'>
											{userInfo?.following?.length}
										</span>{' '}
										Following
									</span>
									<span>
										<span className='count'>
											{userInfo?.follower?.length}
										</span>{' '}
										Followers
									</span>
								</p>
								{/* Later future reference */}
								{/* {isUserOnHisProfile && (
									<div className='profile-routes'>
										<Link to={`/user/${userId}`}>Posts</Link>
										<Link
											className='link-to-bookmarks'
											to='/user/bookmarks'>
											Bookmarks
										</Link>
										<Link
											className='link-to-bookmarks'
											to='/user/likes'>
											Likes
										</Link>
									</div>
								)} */}
							</div>
						</div>
					</div>
					{userId === userInfo?._id ? (
						<button>
							Edit Profile <IcOutlineModeEdit />
						</button>
					) : (
						<button onClick={() => handleFollow(userInfo?._id)}>
							{isFollowed ? 'Unfollow' : 'Follow'}
						</button>
					)}
				</div>
			</div>

			<div className='userPosts'>
				{userPosts?.map((post, idx) => (
					<Posts
						key={idx}
						post={post}
						handleLikes={handleLikes}
						isUserProfile={true}
						handleDeletePost={handleDeletePost}
						handleBookMarks={handleBookMarks}
						isUserOnHisProfile={isUserOnHisProfile}
					/>
				))}
			</div>
		</StyledProfileSection>
	)
}

export default ProfilePage
