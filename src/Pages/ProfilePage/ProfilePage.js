import { useLocation, useParams } from 'react-router-dom'
import { generateUserInfo } from '../../utils/generateUserInfo'
import { API } from '../../utils/api'
import { randomImgAPI } from '../../utils/api'
import { StyledProfileSection } from './styles/ProfileSection.styled.js'
import { StyledEditForm } from './styles/EditForm.styled.js'
import {
	IcOutlineModeEdit,
	DashiconsFormatGallery,
	ZondiconsCloseSolid,
} from '../../Icones'
import { useDispatch, useSelector } from 'react-redux'
import { Posts } from '../../Components'
import axios from 'axios'
import { useEffect, useState } from 'react'
import {
	getUsersPosts,
	bookmarkPost,
	removeBookMark,
} from '../../Features/postsSlice'
import { getUserInfo } from '../../Features/userSlice'
import { likePost, unlikePost } from '../../Features/postsSlice'
import { useModal } from '../../Providers/ModalProvider'

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

	const [showEditModal, setShowEditModal] = useState(false)
	const [profilePreview, setprofPreview] = useState(null)
	const [bgPreview, setbgPreview] = useState(null)

	const [editData, setEditData] = useState({
		username: userInfo?.username,
		bio: userInfo?.username,
		profilePic: null,
		bgImage: null,
	})

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
		showEditModal,
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

	const handleEdit = userInfo => {
		setShowEditModal(true)

		setEditData(prev => {
			return {
				...prev,
				username: userInfo?.username,
				bio: userInfo?.bio,
			}
		})
	}

	const uploadProfilePic = e => {
		setprofPreview(URL.createObjectURL(e.target.files[0]))

		setEditData(prev => {
			return {
				...prev,
				profilePic: e.target.files[0],
			}
		})
	}

	const uploadBackgroundImg = e => {
		setbgPreview(URL.createObjectURL(e.target.files[0]))

		setEditData(prev => {
			return {
				...prev,
				bgImage: e.target.files[0],
			}
		})
	}

	const handleEditForm = e => {
		e.preventDefault()
		const { name, value } = e.target
		setEditData(prev => {
			return {
				...prev,
				[name]: value,
			}
		})
	}

	const handleSubmit = async e => {
		e.preventDefault()

		setShowEditModal(false)

		const [config] = generateUserInfo('formdata')

		let newEditData = new FormData()

		newEditData.append(
			'username',
			editData.username ?? userInfo?.username
		)

		newEditData.append('bio', editData.bio ?? userInfo?.bio)

		newEditData.append('profilePic', editData.profilePic)

		newEditData.append('bgImage', editData.bgImage)

		const res = await axios.put(
			`${API}/api/users/${userInfo?._id}`,
			newEditData,
			config
		)

		if (res) dispatch(getUserInfo(id))
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
						<button onClick={() => handleEdit(userInfo)}>
							Edit Profile <IcOutlineModeEdit />
						</button>
					) : (
						<button onClick={() => handleFollow(userInfo?._id)}>
							{isFollowed ? 'Unfollow' : 'Follow'}
						</button>
					)}
				</div>
			</div>

			<StyledEditForm showEditModal={showEditModal}>
				<form onSubmit={handleSubmit}>
					<ZondiconsCloseSolid
						className='close-icon'
						onClick={() => setShowEditModal(false)}
					/>
					<input
						placeholder='Username'
						name='username'
						value={editData.username}
						onChange={handleEditForm}
					/>
					<textarea
						placeholder='Bio'
						name='bio'
						value={editData.bio}
						onChange={handleEditForm}
						maxLength='30'></textarea>
					<label htmlFor='img-vid'>
						Background:
						<input
							id='img-vid'
							type='file'
							accept='image/*'
							onChange={uploadBackgroundImg}
							hidden
						/>
						<DashiconsFormatGallery />
						{bgPreview && (
							<img
								src={bgPreview}
								alt='preview-img'
								className='preview-imgs'
								type='image/*'
							/>
						)}
					</label>
					<label htmlFor='img-vid' className='img-label'>
						Dp
						<input
							id='img-vid'
							type='file'
							accept='image/*'
							onChange={uploadProfilePic}
							hidden
						/>
						<DashiconsFormatGallery />
						{profilePreview && (
							<img
								src={profilePreview}
								alt='preview-img'
								className='preview-imgs'
							/>
						)}
					</label>
					<button>Edit</button>
				</form>
			</StyledEditForm>

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
