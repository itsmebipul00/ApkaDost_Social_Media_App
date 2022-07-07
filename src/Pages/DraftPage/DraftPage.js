import { StyleDrafts } from './DraftPage.styled'
import { Fragment, useEffect, useState } from 'react'
import { generateUserInfo } from '../../utils/generateUserInfo'
import { API } from '../../utils/api'
import axios from 'axios'
import { Posts } from '../../Components'
import toast from 'react-hot-toast'
import { useModal } from '../../Providers/ModalProvider'
import { useNavigate } from 'react-router-dom'

const DraftsPage = () => {
	const {
		setModal,
		setIsItaDraft,
		setPreview,
		setPostId,
		setNewPost,
		isItaDraft,
	} = useModal()

	const [config, userInfo] = generateUserInfo()

	const [drafts, setDrafts] = useState([])
	const getDrafts = async () => {
		try {
			const res = await axios.get(
				`${API}/api/users/drafts/${userInfo?._id}`,
				config
			)
			setDrafts(res.data)
		} catch (error) {
			throw error
		}
	}

	useEffect(() => {
		getDrafts()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isItaDraft])

	const handleDraft = post => {
		setModal(true)
		setIsItaDraft(true)
		setPreview(post?.content?.image)
		setPostId(post?._id)
		setNewPost(prev => {
			return {
				...prev,
				postText: post?.content?.text,
				file: post?.content?.image,
			}
		})
	}

	const deleteDraft = async id => {
		const res = await axios.delete(
			`${API}/api/users/drafts/${id}`,
			config
		)
		if (res) {
			toast.success('Draft deleted')
			getDrafts()
		}
	}

	const navigate = useNavigate()
	return (
		<Fragment>
			{drafts?.length > 0 ? (
				drafts.map((post, idx) => (
					<Posts
						post={post}
						isItDraftPage={true}
						handleDraft={handleDraft}
						deleteDraft={deleteDraft}
					/>
				))
			) : (
				<StyleDrafts className='no-bookmark'>
					<img
						src={`${window.location.origin}/images/empty-drafts.png`}
						alt='no-bookmark'
						className='empty-feed'
					/>
					<p className='empty-feed-text'>
						Post your drafts or delete them
					</p>
					<button
						className='btn-explore'
						onClick={() => navigate('/explore')}>
						Explore
					</button>
				</StyleDrafts>
			)}
		</Fragment>
	)
}

export default DraftsPage
