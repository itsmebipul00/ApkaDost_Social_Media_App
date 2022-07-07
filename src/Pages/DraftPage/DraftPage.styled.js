import styled from 'styled-components'

export const StyleDrafts = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	.empty-feed {
		margin: 0 auto;
		width: 12rem;
	}
	.empty-feed-text {
		text-align: center;
		margin-top: 0;
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
