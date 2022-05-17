import styled from 'styled-components'

export const StyledMain = styled.main`
	margin-top: 3vh;
	@media (min-width: 60em) {
		margin-top: 0;
		position: fixed;
		inset: 12% 10% 0% 35%;
		overflow: scroll;

		-ms-overflow-style: none; /* for Internet Explorer, Edge */
		scrollbar-width: none; /* for Firefox */
		overflow-y: scroll;

		&::-webkit-scrollbar {
			display: none; /* for Chrome, Safari, and Opera */
		}
	}
`
