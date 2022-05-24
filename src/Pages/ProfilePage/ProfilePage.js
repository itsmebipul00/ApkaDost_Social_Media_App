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
import { Loader, Posts } from '../../Components'
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
import toast from 'react-hot-toast'

import { cloudAPI } from '../../utils/api'

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

	const isUserPostsLoading = useSelector(
		state => state?.posts?.isLoading
	)

	const isUserInfoLoading = useSelector(
		state => state?.auth.isLoading
	)

	const [showEditModal, setShowEditModal] = useState(false)
	const [profilePreview, setprofPreview] = useState(null)
	const [bgPreview, setbgPreview] = useState(null)

	const initialState = {
		username: userInfo?.username,
		bio: userInfo?.username,
		profilePic: null,
		bgImage: null,
	}

	const [editData, setEditData] = useState(initialState)

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
		const res = await axios.delete(
			`${API}/api/posts/delete/${id}`,
			config
		)

		if (res) toast.success('Post deleted')

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

		setprofPreview(userInfo?.profilePic)

		setbgPreview(userInfo?.bgImage)
	}

	const uploadProfilePic = async e => {
		const newImage = new FormData()

		newImage.append('file', e.target.files[0])

		newImage.append('upload_preset', 'ghxxtmtb')

		const res = await axios.post(`${cloudAPI}`, newImage)

		if (res?.data?.url) {
			setprofPreview(URL.createObjectURL(e.target.files[0]))

			setEditData(prev => {
				return {
					...prev,
					profilePic: res?.data?.url,
				}
			})

			toast.success('Image Uploaded')
		}
	}

	const uploadBackgroundImg = async e => {
		const newImage = new FormData()

		newImage.append('file', e.target.files[0])

		newImage.append('upload_preset', 'ghxxtmtb')

		const res = await axios.post(`${cloudAPI}`, newImage)

		if (res?.data?.url) {
			setbgPreview(URL.createObjectURL(e.target.files[0]))

			setEditData(prev => {
				return {
					...prev,
					bgImage: res?.data?.url,
				}
			})

			toast.success('Image Uploaded')
		}
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

		newEditData.append(
			'profilePic',
			editData.profilePic ?? userInfo?.profilePic
		)

		newEditData.append(
			'bgImage',
			editData.bgImage ?? userInfo?.bgImage
		)

		const res = await axios.put(
			`${API}/api/users/${userInfo?._id}`,
			newEditData,
			config
		)

		if (res) dispatch(getUserInfo(id))

		setEditData(initialState)
	}

	const copyURL = () => {
		navigator.clipboard.writeText(
			`${window.location.origin}${location.pathname}`
		)
		toast.success('Link copied to clipboard')
	}

	const handleClose = () => {
		setEditData(initialState)
		setShowEditModal(false)
	}

	const archivePost = async id => {
		const [config] = generateUserInfo()

		const res = await axios.post(
			`${API}/api/posts/archive/${id}`,
			{},
			config
		)

		if (res) {
			toast.success('Post archived')
			dispatch(getUsersPosts(userInfo?._id))
		}
	}

	const removeFromArchive = async id => {
		const [config] = generateUserInfo()

		const res = await axios.delete(
			`${API}/api/posts/archive/${id}`,
			config
		)

		if (res) {
			toast.success('Post unarchived')
			dispatch(getUsersPosts(userInfo?._id))
		}
	}

	return (
		<StyledProfileSection>
			{(isUserInfoLoading || isUserPostsLoading) && <Loader />}
			<div className='profileInfo-wrapper'>
				<img
					src={`${
						userInfo?.bgImage === 'null' ||
						userInfo?.bgImage === undefined
							? `${randomImgAPI}/800/400`
							: userInfo?.bgImage
					}`}
					alt='user-bgImg'
					className='user-bgImg'
				/>
				<div className='profile-subInfo'>
					<div>
						<div className='profile-pic-wrapper'>
							<img
								src={`${
									userInfo?.profilePic === 'null' ||
									userInfo?.profilePic === undefined
										? `${randomImgAPI}/400/400`
										: userInfo?.profilePic
								}`}
								alt='user-profilePic'
								className='user-profilePic'
							/>
						</div>

						<div className='profile-details'>
							<p>{userInfo?.username}</p>
							<p className='user-bio'>{userInfo?.bio}</p>
							<p className='user-url' onClick={copyURL}>
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
						onClick={handleClose}
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
					<div className='user-images'>
						<label
							htmlFor='background-pic'
							className='background-pic'>
							Background:
							<input
								id='background-pic'
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
									className='preview-bgimg'
									type='image/*'
								/>
							)}
						</label>
						<label htmlFor='profile-pic' className='profile-pic'>
							Dp
							<input
								id='profile-pic'
								type='file'
								accept='image/*'
								onChange={uploadProfilePic}
								hidden
							/>
							<DashiconsFormatGallery />
							{profilePreview && (
								<img
									src={profilePreview}
									alt='preview-profilePic'
									className='preview-profilePic'
								/>
							)}
						</label>
					</div>
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
						archivePost={archivePost}
						removeFromArchive={removeFromArchive}
						handleBookMarks={handleBookMarks}
						isUserOnHisProfile={isUserOnHisProfile}
					/>
				))}
			</div>
		</StyledProfileSection>
	)
}
export default ProfilePage
