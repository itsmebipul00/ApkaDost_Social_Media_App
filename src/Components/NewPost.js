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

import { randomImgAPI } from '../utils/api'

import { useModal } from '../Providers/ModalProvider'
import { useParams } from 'react-router-dom'
import { generateUserInfo } from '../utils/generateUserInfo'

import { API } from '../utils/api'

import axios from 'axios'

function NewPost() {
	//add img source later in backed db
	// const location = useLocation()
	const { id } = useParams()

	const user = useSelector(state => state.auth.user)

	const [config, userInfo] = generateUserInfo('formdata')

	// console.log(userInfo)

	const {
		modal,
		setModal,
		initialState,
		newPost,
		setNewPost,
		setUploadFileType,
		uploadfileType,
		preview,
		setPreview,
		isItAnEdit,
		postId,
		setIsItAnEdit,
	} = useModal()

	const { dp, username } = user

	const imgSrc = !!dp
		? `${window.location.origin}/${dp}`
		: randomImgAPI

	const handleSubmitPost = () => {}

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

		setModal(false)
	}

	useEffect(() => {
		dispatch(getAllPosts())
		dispatch(getUsersPosts(userInfo._id))
	}, [modal, dispatch, userInfo._id])

	const openModal = e => {
		e.stopPropagation()

		setModal(true)

		setNewPost(initialState)

		setPreview(null)
	}

	const saveToDrafts = () => {
		//Save to drafts do later
		setModal(false)
	}

	const uploadNewFile = e => {
		const fileType = e.target.files[0].type

		setUploadFileType(fileType)

		setPreview(URL.createObjectURL(e.target.files[0]))

		setNewPost(prev => {
			return {
				...prev,
				file: e.target.files[0],
			}
		})
	}

	const handleUpdatePost = async e => {
		e.preventDefault()

		setModal(false)

		setIsItAnEdit(false)

		let newPostData = new FormData()

		newPostData.append('postText', newPost.postText)

		await axios.put(`${API}/api/posts/${postId}`, newPost, config)
	}

	return (
		<StyledNewPost modalShown={modal} preview={preview}>
			{!modal && (
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
					<form
						className='textarea-wrapper'
						onSubmit={handleFormSubmit}>
						<textarea
							placeholder='How are you doing 😋?'
							onChange={handlePost}
							value={newPost.postText}
							maxLength='500'
						/>
						{preview &&
							(uploadfileType.split('/')[0] === 'image' ? (
								<img
									src={preview}
									alt='preview-video'
									className='preview-img'
									type={uploadfileType}
								/>
							) : (
								<video controls width='350'>
									<source src={preview} type={uploadfileType} />
								</video>
							))}

						<div className='call-to-actions'>
							<label htmlFor='img-vid'>
								<input
									id='img-vid'
									type='file'
									accept='image/*,video/*'
									onChange={uploadNewFile}
									hidden
								/>
								<DashiconsFormatGallery />
							</label>
							{/* <label htmlFor='gif'>
								<input
									id='gif'
									type='file'
									accept='image/gif'
									onChange={handleMedia}
									disabled={!!postGif ? true : false}
									hidden
								/>
								<FluentGif16Regular />
							</label> */}
							{id === userInfo._id && isItAnEdit ? (
								<button onClick={handleUpdatePost}>Update</button>
							) : (
								<button onClick={handleSubmitPost}>Chirp</button>
							)}
						</div>
					</form>
				</div>
			</section>
		</StyledNewPost>
	)
}

export default NewPost
