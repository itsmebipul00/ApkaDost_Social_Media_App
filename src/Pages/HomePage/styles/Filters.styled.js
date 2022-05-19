import styled from 'styled-components'

export const StyledFilters = styled.li`
	list-style: none;
	display: flex;
	gap: 1rem;
	justify-content: flex-end;
	margin: 1rem 1rem 0 0;

	label:hover {
		text-decoration: underline;
		text-decoration-color: var(--blue);
		cursor: pointer;
	}
`
