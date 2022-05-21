import { createContext, useContext, useState } from 'react'

const ModalContext = createContext()

const ModalProvider = props => {
	const initialState = {
		postText: '',
		file: null,
	}
	const [isItAnEdit, setIsItAnEdit] = useState(false)
	const [newPost, setNewPost] = useState(initialState)
	const [modal, setModal] = useState(false)
	const [preview, setPreview] = useState(null)
	const [uploadfileType, setUploadFileType] = useState('')
	const [postId, setPostId] = useState('')
	const [isUpDated, setIsUpdated] = useState(false)

	return (
		<ModalContext.Provider
			value={{
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
				setIsUpdated,
				isUpDated,
			}}>
			{props.children}
		</ModalContext.Provider>
	)
}

const useModal = () => useContext(ModalContext)

export { ModalProvider, useModal }
