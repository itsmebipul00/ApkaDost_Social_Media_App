import { createContext, useContext, useState } from 'react'

const ModalContext = createContext()

const ModalProvider = props => {
	const initialState = {
		postText: '',
		file: false,
	}
	const [isItAnEdit, setIsItAnEdit] = useState(false)
	const [newPost, setNewPost] = useState(initialState)
	const [modal, setModal] = useState(false)
	const [preview, setPreview] = useState(null)
	const [uploadfileType, setUploadFileType] = useState('')
	const [postId, setPostId] = useState('')
	const [isItaDraft, setIsItaDraft] = useState(false)

	return (
		<ModalContext.Provider
			value={{
				isItaDraft,
				setIsItaDraft,
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
				setIsItAnEdit,
				setPostId,
				postId,
			}}>
			{props.children}
		</ModalContext.Provider>
	)
}

const useModal = () => useContext(ModalContext)

export { ModalProvider, useModal }
