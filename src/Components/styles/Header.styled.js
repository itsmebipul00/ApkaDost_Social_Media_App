import styled from 'styled-components'

export const StyledHeader = styled.header`
	height: 10%;
	display: grid;
	padding: 1rem;
	margin: 0 auto;
	justify-content: space-between;
	align-items: center;
	grid-template-columns: 5rem 1fr 3rem;

	span {
		width: 100%;
		justify-self: end;
		padding-top: 1rem;
		position: relative;

		svg {
			position: absolute;
			inset: 40% 0% 0% 85%;
			cursor: pointer;
		}
	}

	.theme-toggler {
		cursor: pointer;
	}

	@media (min-width: 60em) {
		width: 90%;
		margin: unset;
		margin-left: auto;

		label {
			justify-self: end;
			align-self: center;
		}

		span {
			width: 25%;
		}
	}

	& > * {
		height: 100%;
		cursor: pointer;
	}

	img {
		width: 4rem;
		aspect-ratio: 1;
		z-index: var(--zIndex-3);
	}

	svg {
		width: 2.5rem;
		justify-self: end;
		align-self: center;
		cursor: pointer;
	}
`
