import styled from 'styled-components'

export const StyledNavigation = styled.nav`
	display: flex;
	position: fixed;
	inset: 0% 50% 0% -50%;
	flex-direction: column;
	transform: ${p =>
		p.collapseNav ? 'translateX(-100%)' : 'translateX(50%)'};
	transition: transform 500ms ease-in-out;
	z-index: var(--zIndex-1);
	background-color: var(--white);
	padding-top: 6vh;
	margin-top: 2rem;
	& > * {
		margin: 2rem;
	}

	& svg > * {
		display: inline-block;
		color: var(--black);
		margin-left: 1rem;
		width: 1rem;
		height: 1rem;
	}

	a {
		margin-left: 1rem;
	}

	button {
		all: unset;
		cursor: pointer;
		margin-left: 1rem;
	}
	button:hover,
	button:focus {
		color: var(--cream);
	}

	li {
		list-style: none;
	}
	@media (min-width: 60em) {
		transform: unset;
		transition: unset;
		inset: 3% 70% 0% 10%;
		border-right: 2px solid var(--cream);
		margin-top: 1rem;

		a {
			color: inherit;
			letter-spacing: var(--letter-spacing-1);
		}
	}
`
