import { useLocation, useParams } from 'react-router-dom'
import { generateUserInfo } from '../../utils/generateUserInfo'
import { API } from '../../utils/api'
import { randomImgAPI } from '../../utils/api'
import { StyledProfileSection } from './styles/ProfileSection.styled.js'
import { IcOutlineModeEdit } from '../../Icones'
import { useDispatch, useSelector } from 'react-redux'
import { Posts } from '../../Components'
import axios from 'axios'
import { useEffect } from 'react'
import { getUsersPosts } from '../../Features/postsSlice'
import { getUserInfo } from '../../Features/userSlice'
import { likePost, unlikePost } from '../../Features/postsSlice'
import { useModal } from '../../Providers/ModalProvider'

function ProfilePage() {
	const location = useLocation()
	const isLiked = useSelector(state => state?.posts?.isLiked)

	const isUnliked = useSelector(state => state?.posts?.isUnliked)

	// console.log(window.location.origin + location.pathname) //Future, use for url
	// const id = location.pathname.split('/')[2]

	const { id } = useParams()

	const [config] = generateUserInfo()

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
	}, [userInfo?._id, id, isLiked, isUnliked, modal])

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
		const post = userPosts.find(post => post._id === id)
		const isLiked = post.likes.find(_id => _id === userId)

		if (!isLiked) {
			dispatch(likePost(id))
		} else {
			dispatch(unlikePost(id))
		}
	}

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
					/>
				))}
			</div>
		</StyledProfileSection>
	)
}

export default ProfilePage
