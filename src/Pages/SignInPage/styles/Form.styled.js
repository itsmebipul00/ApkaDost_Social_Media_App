import styled from 'styled-components'

export const StyledForm = styled.form`
	height: 90%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	letter-spacing: var(--letter-spacing-2);

	& > * {
		width: 20rem;
	}

	& > *:not(:last-child) {
		margin-bottom: 1.25rem;
	}

	input {
		width: 100%;
		padding: 0.5rem;
	}

	label[for='remember'] {
		font-size: var(--fs-400);
	}

	input[type='checkbox'] {
		display: inline;
		width: 1rem;
		height: 1rem;
		margin-right: 0.5rem;
		cursor: pointer;
	}

	.span-flex {
		display: flex;
	}

	button {
		padding: 0.25rem 0.75rem;
	}

	a {
		font-size: var(--fs-400);
		text-decoration-color: var(--cream);
		text-decoration-thickness: 3px;
		margin-left: auto;
	}
	a:hover {
		text-decoration-color: var(--gray);
	}
`
