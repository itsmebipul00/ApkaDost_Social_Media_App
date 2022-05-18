import styled from 'styled-components'

export const StyledProfileSection = styled.section`
	.profileInfo-wrapper {
		position: relative;
		.profile-subInfo {
			display: flex;
			justify-content: space-between;
			padding: 1rem;
			position: relative;
			button {
				padding: 0.5rem 1rem;
				@media (min-width: 60em) {
					padding: 0.5rem 2rem;
				}
				cursor: pointer;
				background-color: var(--white);
				color: var(--dark);

				border: 1px solid var(--gray);
				&:hover {
					background-color: var(--gray);
					color: var(--white);
				}
			}
		}
	}
	.follow-count {
		display: flex;
		font-size: var(--fs-400);
		gap: 1rem;
		margin-top: 1rem;
		color: var(--cream);
		.count {
			color: var(--black);
		}
		@media (min-width: 60em) {
			gap: 2rem;
			font-size: var(--fs-500);
		}
	}
	.profile-details {
		position: absolute;
		inset: 120% 0% 0% 6%;
		@media (min-width: 60em) {
			inset: 150% 0% 0% 0%;
		}
	}
	.user-bio {
		margin-top: 1rem;
	}
	.user-url span {
		color: var(--blue);
		text-decoration: underline;
		text-decoration-thickness: 2px;
	}
	.user-url span:hover {
		cursor: pointer;
	}
	.user-bgImg {
		width: 100%;
		height: 35vh;
		@media (min-width: 60em) {
			border-radius: 1rem;
		}
	}
	.profile-pic-wrapper {
		position: absolute;
		inset: -80% 0% 0% 6%;
		width: 7rem;

		@media (min-width: 60em) {
			width: 10rem;
			inset: -115% 0% 0% 8%;
		}
	}
	.user-profilePic {
		width: 100%;
		aspect-ratio: 1;
		border-radius: 50%;
	}
	.userPosts {
		margin-top: 12rem;
	}
`
