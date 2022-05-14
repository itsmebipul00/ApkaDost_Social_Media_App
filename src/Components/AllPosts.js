import { StyledPost } from './styles/Post.styled'

import { useSelector, useDispatch } from 'react-redux'

import { useEffect } from 'react'

import { getAllPosts } from '../Features/postsSlice'

import formatDistance from 'date-fns/formatDistance'
import parseISO from 'date-fns/parseISO'

import {
	MdiCardsHeartOutline,
	MdiCommentMultipleOutline,
	PhShareNetwork,
	MaterialSymbolsArchiveOutline,
	CarbonBookmarkAdd,
	IcSharpTimeline,
} from '../Icones'

function AllPosts(props) {
	const posts = useSelector(state => state.posts)

	const { allPosts } = posts

	const dispatch = useDispatch()

	const { modal } = props

	useEffect(() => {
		dispatch(getAllPosts())
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [modal])
	return (
		<div className='all-posts'>
			{allPosts
				.slice(0)
				.reverse()
				.map((post, idx) => (
					<StyledPost key={idx}>
						<div className='dp-wrapper'>
							<img
								src={post.user.profilePic}
								alt='user-dp'
								className='profile-dp'
							/>
						</div>
						<div className='post-details'>
							<span className='postedBy-info'>
								<h3 className='post-user'>{post.user.username}</h3>
								<span className='uploaded-on'>
									<IcSharpTimeline />
									<span>
										{formatDistance(
											parseISO(post.updatedAt),
											Date.now(),
											{
												addSuffix: true,
											}
										)}
									</span>
								</span>
							</span>
							<p className='post-content'>{post.content.text}</p>
							<span className='cta-btns'>
								<MdiCardsHeartOutline />
								<MdiCommentMultipleOutline />
								<PhShareNetwork />
								<MaterialSymbolsArchiveOutline />
								<CarbonBookmarkAdd />
							</span>
						</div>
					</StyledPost>
				))}
		</div>
	)
}

export default AllPosts
