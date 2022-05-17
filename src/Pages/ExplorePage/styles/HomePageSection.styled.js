import styled from 'styled-components'

export const StyledHomePageSection = styled.section`
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

	@media (min-width: 60em) {
		.all-posts {
			position: fixed;
			inset: 10% 15% 0% 30%;
			overflow: scroll;

			-ms-overflow-style: none; /* for Internet Explorer, Edge */
			scrollbar-width: none; /* for Firefox */
			overflow-y: scroll;
		}

		.all-posts::-webkit-scrollbar {
			display: none; /* for Chrome, Safari, and Opera */
		}
	}
`
