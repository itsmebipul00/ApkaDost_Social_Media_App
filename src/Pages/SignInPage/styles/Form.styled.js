import styled from 'styled-components'

export const StyledForm = styled.form`
	background-image: url('/images/login-bg.png'),
		url('/images/login-bg2.png');
	background-repeat: no-repeat;
	background-position: center left, center right;
	height: 90%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	letter-spacing: var(--letter-spacing-2);

	h3 {
		z-index: 9999999;
		color: var(--clr-blue);
		font-size: 2rem;
		white-space: nowrap;
		margin-left: 0.5rem;
		font-weight: bold;
		background: -webkit-linear-gradient(
			to right,
			#a5fecb,
			#20bdff,
			#5433ff
		); /* Chrome 10-25, Safari 5.1-6 */
		background: linear-gradient(
			to right,
			#a5fecb,
			#20bdff,
			#5433ff
		); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

		background-clip: text;
		-webkit-background-clip: text;
		color: transparent;
	}
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
