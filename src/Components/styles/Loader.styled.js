import styled from 'styled-components'

export const StyledLoader = styled.div`
	position: fixed;
	min-height: 100%;
	min-width: 100%;
	@media (min-width: 60em) {
		min-width: 63%;
	}
	display: flex;
	justify-content: center;
	align-items: center;
	backdrop-filter: blur(1rem);
	z-index: 999999;
	.loader,
	.loader:before,
	.loader:after {
		background: hsl(var(--clr-white));
		-webkit-animation: load1 1s infinite ease-in-out;
		animation: load1 1s infinite ease-in-out;
		width: 1em;
		height: 4em;
	}
	.loader {
		color: hsl(var(--clr-white));
		text-indent: -9999em;
		margin: 88px auto;
		position: relative;
		font-size: 11px;
		-webkit-transform: translateZ(0);
		-ms-transform: translateZ(0);
		transform: translateZ(0);
		-webkit-animation-delay: -0.16s;
		animation-delay: -0.16s;
	}
	.loader:before,
	.loader:after {
		position: absolute;
		top: 0;
		content: '';
	}
	.loader:before {
		left: -1.5em;
		-webkit-animation-delay: -0.32s;
		animation-delay: -0.32s;
	}
	.loader:after {
		left: 1.5em;
	}
	@-webkit-keyframes load1 {
		0%,
		80%,
		100% {
			box-shadow: 0 0;
			height: 4em;
		}
		40% {
			box-shadow: 0 -2em;
			height: 5em;
		}
	}
	@keyframes load1 {
		0%,
		80%,
		100% {
			box-shadow: 0 0;
			height: 4em;
		}
		40% {
			box-shadow: 0 -2em;
			height: 5em;
		}
	}
`
