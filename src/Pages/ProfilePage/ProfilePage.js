import { useLocation } from 'react-router-dom'
import { generateUserInfo } from '../../utils/generateUserInfo'
import { API } from '../../utils/api'
import { useAxios } from '../../Hooks'
import formatDistance from 'date-fns/formatDistance'
import parseISO from 'date-fns/parseISO'
import { randomImgAPI } from '../../utils/api'
import { StyledProfileSection } from './styles/ProfileSection.styled.js'
import { IcOutlineModeEdit } from '../../Icones'
import { useSelector } from 'react-redux'
import { Posts } from '../../Components'
function ProfilePage() {
	const location = useLocation()

	// console.log(window.location.origin + location.pathname) //Future, use for url

	const id = location.pathname.split('/')[2]

	const [config] = generateUserInfo()

	const { headers } = config

	const [userInfo] = useAxios({
		method: 'get',
		url: `${API}/api/users/${id}`,
		headers,
	})

	const [userPosts] = useAxios({
		method: 'get',
		url: `${API}/api/posts/user/${userInfo?._id}`,
		headers,
	})

	const userId = useSelector(state => state.auth.user._id)

	const handleFollow = id => {
		console.log(id)
	}

	console.log(userPosts)

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
							Follow
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
