import { StyledHomePageSection } from './styles/HomePageSection.styled'
import { Header, NewPost, AllPosts } from '../../Components'

function HomePage() {
	return (
		<StyledHomePageSection>
			<Header />
			<NewPost />
			<AllPosts />
		</StyledHomePageSection>
	)
}

export default HomePage
