import styled from 'styled-components'

export const StyledReplyBox = styled.section`
	width: 100%;
	height: 20vh;
	display: flex;
	gap: 1rem;
	padding: 0 1.5rem;
	@media (min-width: 40rem) {
		padding: 0 3rem;
	}

	.round-dp {
		width: 100%;
		border-radius: 50%;
		width: 5rem;
		aspect-ratio: 1;
	}
	.reply-textarea {
		width: 60%;
		height: 100%;
		padding: 1rem;
		resize: none;
		background-color: var(--white);
		color: var(--cream);
	}

	.reply-btn {
		cursor: pointer;
		align-self: flex-end;
		width: 20%;
		padding: 0.5rem 0;
		border-radius: 2rem;
		background-color: var(--white);
		color: var(--black);
		border: 1px solid var(--black);
	}
`
