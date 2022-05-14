import { Input } from '..'

import styled from 'styled-components'

export const StyledInputSearch = styled(Input)`
	background-color: inherit;
	border: 3px solid var(--cream);
	color: var(--cream);
	width: 100%;
	padding: 0 1rem;
	z-index: var(--zIndex-4);

	@media (min-width: 60em) {
		width: 100%;
	}
`
