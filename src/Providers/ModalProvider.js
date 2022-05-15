import { createContext, useContext, useState } from 'react'

const ModalContext = createContext()

const ModalProvider = props => {
	const [modal, setModal] = useState(false)

	return (
		<ModalContext.Provider value={{ modal, setModal }}>
			{props.children}
		</ModalContext.Provider>
	)
}

const useModal = () => useContext(ModalContext)

export { ModalProvider, useModal }
