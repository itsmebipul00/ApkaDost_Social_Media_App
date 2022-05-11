import { Fragment, useState } from 'react'

import { createNewPost } from '../Features/postsSlice'

import {
	MdiFeather,
	IcBaselineClose,
	FluentGif16Regular,
	DashiconsFormatGallery,
} from '../Icones'

import { StyledNewPost } from '../Components'

import { useSelector, useDispatch } from 'react-redux'

import { randomImgAPI } from '../utils/api'

function NewPost() {
	const [modal, setModal] = useState(false)

	//add img source later in backed db
	const userImg = useSelector(state => state.auth.user.img)

	const imgSrc = !!userImg ? userImg : randomImgAPI

	const initialState = {
		postText: '',
		file: null,
	}
	const [newPost, setNewPost] = useState(initialState)

	const [preview, setPreview] = useState(null)

	const [uploadfileType, setUploadFileType] = useState('')

	// const [btnDisabled, setBtnDisabled] = useState(false)

	const handleSubmitPost = () => {}

	// const { postGif, postImg, postText } = newPost

	// console.log(postGif, postImg, postText)

	// const handleDisabled = () => {
	// 	if (postGif === '' || postImg === '' || postText === '') {
	// 		setBtnDisabled(true)
	// 	} else {
	// 		setBtnDisabled(false)
	// 	}
	// }

	// const [vidInputDisable, setVidInpDisable] = useState(false)
	// const [gifInputDisable, setGifInpDisable] = useState(false)

	// const handleVidInputDisable = () =>
	// 	!!postGif ? setVidInpDisable(true) : setVidInpDisable(false)
	// const handleGifInputDisable = () =>
	// 	!!postImg ? setGifInpDisable(true) : setGifInpDisable(false)

	// const handleInputDisable = () => {
	// 	if (!!postGif) {
	// 	}
	// }
	// const [previewImg, setPreviewImg] = useState('')

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

		dispatch(createNewPost([...newPostData]))

		// console.log([...newPostData])

		setNewPost(initialState)
		setModal(prev => !prev)
	}

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

	console.log(preview)

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
					<img
						src={imgSrc}
						alt='profile-pic'
						className='profile-pic'
					/>
					<form
						className='textarea-wrapper'
						onSubmit={handleFormSubmit}>
						<textarea
							onChange={handlePost}
							value={newPost.postText}
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
									accept='image/jpeg,image/png,image/webp,video/mp4,video/quicktime,video/webm'
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
