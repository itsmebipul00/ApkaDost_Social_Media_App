import { StyledHomePageSection } from './styles/HomePageSection.styled'
import { Header, NewPost, AllPosts } from '../../Components'
import { useState } from 'react'

function HomePage() {
	const [modal, setModal] = useState(false)

	return (
		<StyledHomePageSection>
			<Header />
			<NewPost modal={modal} setModal={setModal} />
			<AllPosts modal={modal} />
		</StyledHomePageSection>
	)
}

export default HomePage
