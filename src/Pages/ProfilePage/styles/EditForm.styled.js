import styled from 'styled-components'

export const StyledEditForm = styled.div`
	display: ${p => (p.showEditModal ? 'flex' : 'none')};
	position: fixed;
	overflow: scroll;
	width: 100%;
	height: 100%;
	inset: 0% 0% 0% 0%;
	z-index: var(--zIndex-4);
	backdrop-filter: blur(1rem);
	background-color: var(--dark);
	-ms-overflow-style: none; /* for Internet Explorer, Edge */
	scrollbar-width: none; /* for Firefox */
	overflow-y: scroll;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	&::-webkit-scrollbar {
		display: none;
	}
	@media (min-width: 60em) {
		width: 60%;
		aspect-ratio: 1;
		inset: 10% 0% 0% 34%;
		border-radius: 2rem;
	}

	form {
		z-index: var(--zIndex-5);
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border: 3rem solid var(--white);
		padding: 1rem;
		.close-icon {
			cursor: pointer;
		}
		& > * {
			margin: 1rem;
			border-radius: 2rem;
			border: 0;
			width: 80%;
		}
		svg {
			margin-left: 1rem;
			width: 2rem;
			height: 2rem;
		}
		input {
			padding: 0.5rem;
			background-color: inherit;
			border: 3px solid var(--black);
			color: var(--black);
		}
		.user-images {
			display: flex;
			flex-direction: column;
			@media (min-width: 60em) {
				flex-direction: row;
			}
			justify-content: space-between;
		}
		.preview-profilePic,
		.preview-bgimg {
			margin-left: 1rem;
			width: 4rem;
			@media (min-width: 40em) {
				width: 8rem;
			}
			aspect-ratio: 1;
		}
		.background-pic,
		.profile-pic {
			margin-right: 1rem;
			display: flex;
			flex-direction: column;
		}
		textarea {
			padding: 1rem;
			height: 15vw;
			resize: none;
			background-color: inherit;
			border: 3px solid var(--black);
			color: var(--black);
			-ms-overflow-style: none; /* for Internet Explorer, Edge */
			scrollbar-width: none; /* for Firefox */
			overflow-y: scroll;

			&::-webkit-scrollbar {
				display: none; /* for Chrome, Safari, and Opera */
			}
		}
		button {
			background-color: inherit;
			border: 3px solid var(--black);
			padding: 0.5rem 1.5rem;
			color: var(--black);
			cursor: pointer;
			margin-top: 2rem;
		}
		button:hover {
			color: var(--blue);
		}
		.preview-imgs {
			width: 5rem;
			aspect-ratio: 1;
			margin: 1rem;
		}
		.img-label {
			display: flex;
			margin-bottom: 0;
		}
	}
`
