import { StyledHomePageSection } from './styles/HomePageSection.styled'
import { Header, NewPost } from '../../Components'

function HomePage() {
	return (
		<StyledHomePageSection>
			<Header />
			<NewPost />
		</StyledHomePageSection>
	)
}

export default HomePage
