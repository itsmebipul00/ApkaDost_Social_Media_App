import styled from 'styled-components'

export const StyledNotFound = styled.div`
	padding-top: 5rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	.page-not-found {
		width: 25rem;
	}

	.btn-shop-now {
		background-color: hsl(var(--clr-blue));
	}

	.btn-explore {
		padding: 0.5rem 3rem;
		background-color: var(--blue);
		cursor: pointer;
		align-self: center;
		margin-top: 1rem;
		&:hover {
			background-color: var(--blue/0.7);
		}
	}
`
