import { StyledHomePageSection } from './styles/HomePageSection.styled'
import { NewPost, AllPosts } from '../../Components'

function ExplorePage() {
	return (
		<StyledHomePageSection>
			<NewPost />
			<AllPosts />
		</StyledHomePageSection>
	)
}

export default ExplorePage
