import { useEffect, useState } from 'react'

import { createNewPost, getAllPosts } from '../Features/postsSlice'

import {
	MdiFeather,
	IcBaselineClose,
	DashiconsFormatGallery,
} from '../Icones'

import { StyledNewPost } from '../Components'

import { useSelector, useDispatch } from 'react-redux'

import { randomImgAPI } from '../utils/api'

import { useModal } from '../Providers/ModalProvider'

function NewPost() {
	//add img source later in backed db
	const user = useSelector(state => state.auth.user)

	const { modal, setModal } = useModal()

	const { dp, username } = user

	const imgSrc = !!dp
		? `${window.location.origin}/${dp}`
		: randomImgAPI

	const initialState = {
		postText: '',
		file: null,
	}
	const [newPost, setNewPost] = useState(initialState)

	const [preview, setPreview] = useState(null)

	const [uploadfileType, setUploadFileType] = useState('')

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

		setModal(prev => !prev)
	}

	useEffect(() => {
		dispatch(getAllPosts())
	}, [modal, dispatch])

	const toggleModal = e => {
		e.stopPropagation()

		setModal(prev => !prev)

		setNewPost(initialState)

		setPreview(null)
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

	const handleClose = e => {
		//Save to drafts do later
		toggleModal(e)
	}

	return (
		<StyledNewPost modalShown={modal} preview={preview}>
			{!modal && (
				<button className='chrip-btn' onClick={handleClose}>
					<MdiFeather />
				</button>
			)}

			<section className='new-post-dialog'>
				<IcBaselineClose
					className='close-icon'
					onClick={toggleModal}
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
							{}
							<button onClick={handleSubmitPost}>Chirp</button>
						</div>
					</form>
				</div>
			</section>
		</StyledNewPost>
	)
}

export default NewPost
