import styled from 'styled-components'

export const StyledPost = styled.section`
	padding: 1.5rem;
	display: flex;
	@media (min-width: 40em) {
		padding: 3rem;
	}
	.post-details {
		display: grid;
		gap: 1.5rem;
		width: 100%;
		margin-left: 1rem;
		@media (min-width: 40em) {
			gap: 3rem;
		}
		.cta-btns {
			width: 100%;
			display: flex;
			justify-content: space-between;
			.heart {
				display: flex;
				align-items: center;
			}
			svg {
				cursor: pointer;
				width: 1rem;
				height: 1rem;
				@media (min-width: 60em) {
					width: 1.5rem;
					height: 1.5rem;
				}
				margin-right: 0.5rem;
			}
		}
		.postedBy-info {
			display: flex;
			align-items: center;
			.post-user {
				all: unset;
				font-size: var(--fs-600);
				cursor: pointer;
			}
			.uploaded-on {
				@media (min-width: 40em) {
					svg {
						width: 2rem;
						height: 2rem;
					}
				}
				margin-left: 2rem;
				span {
					margin-left: 0.5rem;
				}
			}
		}
	}

	.profile-dp {
		width: 5rem;
		aspect-ratio: 1;
		border-radius: 50%;
	}
`
