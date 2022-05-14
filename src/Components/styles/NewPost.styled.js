import styled, { css } from 'styled-components'

export const StyledNewPost = styled.section`
	width: 100%;
	.new-post-dialog {
		display: none;
	}
	${p =>
		p.modalShown &&
		css`
			.new-post-dialog {
				position: fixed;
				overflow: scroll;
				width: 100%;
				height: 100%;
				display: flex;
				flex-direction: column;
				z-index: var(--zIndex-5);
				backdrop-filter: blur(1rem);
				background-color: var(--dark);
				-ms-overflow-style: none; /* for Internet Explorer, Edge */
			    scrollbar-width: none; /* for Firefox */
			    overflow-y: scroll;
				&::-webkit-scrollbar{
					display: none;
				}
				@media (min-width: 60em) {
					width: 60%;
					aspect-ratio: 1;
					inset: 12% 0% 0% 31%;
				}
		}

		
				
				.close-icon {
					margin: 0 1rem 1.5rem 2rem;
					background-color: var(--cream);
					color: var(--white);
					border-radius: 50%;
					width: 1.5rem;
					height: 1.5rem;
					cursor: pointer;
				}

				.dialog-wrapper {
					display: flex;
					padding: 1rem;
					& > * {
						margin: 0.25rem;
					}
					.profile-pic-wrapper {
						width: 4rem;
						margin: 1rem 1rem 1rem 0;
						display: flex;
						flex-direction: column;
						align-items: center;
						.username {
							margin: 0.5rem;
							font-size: var(--fs-300);
							@media (min-width: 40em) {
								font-size: var(--fs-400);
							}
						}
						.profile-pic {
							width: 100%;
							aspect-ratio: 1;
							border-radius: 50%;
						}
						@media (min-width: 60em) {
							width: 7rem;
						}
					}

					.textarea-wrapper {
						width: 85%;
						textarea {
							width: 90%;
							height: ${p => (p.preview ? '15vw' : '25vw')};
							background-color: inherit;
							color: var(--cream);
							padding: 1rem;
							font-size: var(--fs-500);
							resize: none;
							border: 1px solid var(--cream);
						}
						.preview-img {
							width: 10rem;
							aspect-ratio: 1;
							margin: 1rem;
							position: relative;
						}
						.preview-img::after {
							position: absolute;
							content: 'X';
							font-size: var(--fs-500);
							background-color: var(--black);
							color: var(--white);
							border-radius: 50%;
							inset: 0% 0% 0% 0%;
						}

						.preview-img::before:hover {
							cursor: pointer;
						}

						.call-to-actions {
							label {
								cursor: pointer;
							}

							svg {
								width: 2rem;
								height: 2rem;
							}
							button {
								padding: 0.25rem 1rem;
								border-radius: 5px;
								cursor: pointer;
								@media (min-width: 60em) {
									padding: 0.5rem 3rem;
								}
							}
							& > * {
								margin-left: 1rem;
							}
						}
					}
				}
			}
		`}

	.chrip-btn {
		cursor: pointer;
		all: unset;
		position: fixed;
		inset: 73% 0% 0% 73%;
		width: fit-content;
		height: fit-content;
		svg {
			background-color: var(--cream);
			border-radius: 50%;
			color: var(--white);
			padding: 0.25rem 1rem;
			height: 6rem;
			cursor: pointer;
			z-index: var(---zIndex-2);

			@media (min-width: 60em) {
				padding: 0.5rem 2rem;
			}
		}
		@media (min-width: 60em) {
			inset: 78% 0% 0% 90%;
		}
		@media (min-width: 40em) {
			inset: 73% 0% 0% 85%;
		}
	}
`
