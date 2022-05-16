import { useLocation } from 'react-router-dom'
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
function ProfilePage() {
	const location = useLocation()

	// console.log(window.location.origin + location.pathname) //Future, use for url

	const id = location.pathname.split('/')[2]

	const [config] = generateUserInfo()

	const userId = useSelector(state => state.auth.user._id)

	const userPosts = useSelector(state => state.posts.userPosts)

	const userInfo = useSelector(state => state.auth.userDetails)

	const dispatch = useDispatch()

	useEffect(() => {
		// eslint-disable-next-line no-undef
		dispatch(getUserInfo(id))
		dispatch(getUsersPosts(userInfo?._id))
	}, [userInfo?._id, dispatch, id])

	const handleFollow = async id => {
		await axios.put(
			`${API}/api/users/follow/${userId}`,
			{ id },
			config
		)
		dispatch(getUserInfo(id))
	}

	const isFollowed = userInfo?.follower?.find(id => id === userId)

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
							<p className='user-url'>URL</p>
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
					<Posts key={idx} post={post} />
				))}
			</div>
		</StyledProfileSection>
	)
}

export default ProfilePage
