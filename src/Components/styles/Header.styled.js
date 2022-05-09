import styled from 'styled-components'

export const StyledHeader = styled.header`
	height: 10%;
	display: grid;
	padding: 1rem;
	margin: 0 auto;
	grid-template-columns: repeat(3, 1fr);

	& > * {
		height: 100%;
		cursor: pointer;
	}

	h1 {
		font-weight: var(--fw-300);
		justify-self: center;
	}

	img {
		width: 4rem;
		aspect-ratio: 1;
	}

	svg {
		width: 2.5rem;
		justify-self: end;
	}
`
