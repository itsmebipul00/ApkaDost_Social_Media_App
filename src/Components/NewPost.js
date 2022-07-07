import { useEffect } from 'react'

import {
	createNewPost,
	getAllPosts,
	getUsersPosts,
} from '../Features/postsSlice'

import {
	MdiFeather,
	IcBaselineClose,
	DashiconsFormatGallery,
} from '../Icones'

import { StyledNewPost } from '../Components'

import { useSelector, useDispatch } from 'react-redux'

import { useModal } from '../Providers/ModalProvider'
import { useLocation, useParams } from 'react-router-dom'
import { generateUserInfo } from '../utils/generateUserInfo'

import { API, cloudAPI } from '../utils/api'

import axios from 'axios'

import { timeout } from '../utils/timeout'
import toast from 'react-hot-toast'

function NewPost() {
	const { id } = useParams()

	const user = useSelector(state => state.auth.user)

	const userDetails = useSelector(state => state?.auth?.userDetails)

	const [config, userInfo] = generateUserInfo('formdata')

	const {
		modal,
		setModal,
		initialState,
		newPost,
		setNewPost,
		preview,
		setPreview,
		isItAnEdit,
		postId,
		setIsItAnEdit,
		isItaDraft,
		setIsItaDraft,
	} = useModal()

	const { username } = user

	const imgSrc = !userDetails?.profilePic
		? `${window.location.origin}/images/no-dp.webp`
		: userDetails?.profilePic

	const dispatch = useDispatch()

	const handlePost = e => {
		setNewPost(prev => {
			return {
				...prev,
				postText: e.target.value,
			}
		})
	}

	const handleFormSubmit = e => {
		e.preventDefault()

		let newPostData = new FormData()

		newPostData.append('postText', newPost.postText)

		newPostData.append('postImgs', newPost.file)

		dispatch(createNewPost(newPostData))

		setNewPost(initialState)

		timeout(setModal(false), 1000)

		setPreview(null)
	}

	useEffect(() => {
		dispatch(getAllPosts())
		dispatch(getUsersPosts(userInfo._id))
	}, [modal, dispatch, userInfo?._id, isItAnEdit])

	const openModal = e => {
		e.stopPropagation()

		setModal(true)

		setNewPost(initialState)

		setPreview(null)

		setIsItAnEdit(false)

		setIsItaDraft(false)
	}

	const saveToDrafts = async () => {
		if (!newPost.postText && !newPost.file) {
			setNewPost(initialState)
			setPreview(null)
			setModal(false)
			setIsItAnEdit(false)
			setIsItaDraft(false)
			return
		}

		const [config] = generateUserInfo()

		//Save to drafts do later
		if (!isItAnEdit && !isItaDraft) {
			let newDraftData = new FormData()

			newDraftData.append('postText', newPost.postText)

			newDraftData.append('postImgs', newPost.file)

			const res = await axios.post(
				`${API}/api/users/drafts/${userInfo?._id}`,
				newDraftData,
				config
			)

			if (res) {
				toast.success('Post saved to drafts')
			}
		}
		setNewPost(initialState)
		setPreview(null)
		setModal(false)
		setIsItAnEdit(false)
		setIsItaDraft(false)
	}

	const uploadNewFile = async e => {
		setPreview(URL.createObjectURL(e.target.files[0]))

		const newImage = new FormData()

		newImage.append('file', e.target.files[0])

		newImage.append('upload_preset', 'ghxxtmtb')

		const res = await axios.post(`${cloudAPI}`, newImage)

		if (res.status === 200) {
			toast.success('Image Uploaded')

			setNewPost(prev => {
				return {
					...prev,
					file: res.data.url,
				}
			})
		}
	}

	const handleUpdatePost = async e => {
		e.preventDefault()

		setModal(false)

		setIsItAnEdit(false)

		let newPostData = new FormData()

		newPostData.append('postText', newPost.postText)

		newPostData.append('postImgs', newPost.file)

		const res = await axios.put(
			`${API}/api/posts/${postId}`,
			newPost,
			config
		)

		if (res.status === 200) {
			toast.success('Post Edited')
			dispatch(getUsersPosts(userInfo?._id))
		}
	}

	const handleDraftSumit = async e => {
		e.preventDefault()

		let newDraftData = new FormData()

		newDraftData.append('postText', newPost.postText)

		newDraftData.append('postImgs', newPost.file)

		const res = await axios.post(
			`${API}/api/posts/drafts/${postId}/${userInfo?._id}`,
			newDraftData,
			config
		)

		if (res.status === 200) {
			toast.success('Draft Posted')
			dispatch(getUsersPosts(userInfo?._id))
		}

		setModal(false)

		setIsItaDraft(false)
	}

	const location = useLocation()

	const isItDrafts = location.pathname === '/drafts'

	return (
		<StyledNewPost modalShown={modal} preview={preview}>
			{!modal && !isItDrafts && (
				<button className='chrip-btn' onClick={openModal}>
					<MdiFeather />
				</button>
			)}
			<section className='new-post-dialog'>
				<IcBaselineClose
					className='close-icon'
					onClick={saveToDrafts}
				/>
				<div className='dialog-wrapper'>
					<div className='profile-pic-wrapper'>
						<img
							src={imgSrc}
							alt='profile-pic'
							className='profile-pic'
						/>
						<p className='username'>{username}</p>
					</div>
					<form className='textarea-wrapper'>
						<textarea
							placeholder='How are you doing 😋?'
							onChange={handlePost}
							value={newPost.postText}
							maxLength='500'
						/>
						{preview && preview !== 'false' && (
							<img
								src={preview}
								alt='preview-video'
								className='preview-img'
							/>
						)}

						<div className='call-to-actions'>
							<label htmlFor='img-vid'>
								<input
									id='img-vid'
									type='file'
									accept='image/*'
									onChange={uploadNewFile}
									hidden
								/>
								<DashiconsFormatGallery />
							</label>

							{id === userInfo?._id && isItAnEdit ? (
								<button onClick={handleUpdatePost}>Update</button>
							) : isItaDraft ? (
								<button onClick={handleDraftSumit}>Post Draft</button>
							) : (
								<button onClick={handleFormSubmit}>Chirp</button>
							)}
						</div>
					</form>
				</div>
			</section>
		</StyledNewPost>
	)
}

export default NewPost
