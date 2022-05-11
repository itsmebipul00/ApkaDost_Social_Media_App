import styled from 'styled-components'

export const StyledHomePageSection = styled.section`
	/* display: grid; */

	.search-wrapper {
		display: flex;
		justify-content: center;
		width: 100%;
		position: relative;
		margin-left: auto;
		@media (min-width: 60em) {
			width: 70vw;
			margin-left: auto;
		}

		svg {
			position: absolute;
			inset: 15% 0% 0% 96%;
			color: var(--white);
		}

		@media (min-width: 60em) {
			svg {
				inset: 15% 0% 0% 93%;
			}
		}
	}
`
