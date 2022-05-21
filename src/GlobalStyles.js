import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`

    :root {
		--fs-900: 3rem;
		--fs-800: 2rem;
		--fs-700: 1.75rem;
		--fs-600: 1.5rem;
		--fs-500: 1.25rem;
		--fs-400: 1rem;
		--fs-300: 0.75rem;
		--fs-200: 0.5rem;
		
		--white: ${({ theme }) => theme.globalTheme.theme.white};
		--black: ${({ theme }) => theme.globalTheme.theme.black};
		--gray: ${({ theme }) => theme.globalTheme.theme.gray};
		--cream: ${({ theme }) => theme.globalTheme.theme.cream};
		--blue: hsl(198, 74%, 47%);

		--z-negative: -1;
		--zIndex-1: 100;
		--zIndex-2: 200;
		--zIndex-3: 300;
		--zIndex-4: 400;
		--zIndex-5: 500;

		input[type="radio"] {
			width: 0;
			height: 0;
			opacity: 0;
		}

		--ff-mono-inconsolata: 'Inconsolata', monospace;

		--letter-spacing-1: 1px;
		--letter-spacing-2: 1.5px;
		--letter-spacing-3: 2px;

		--fw-300: 300;
}


/* Box sizing rules */
html {
	box-sizing: border-box;
}

/* Set core root defaults */
html:focus-within {
	scroll-behavior: smooth;
}

*,
*:before,
*:after {
	box-sizing: inherit;
	margin: 0;
	padding: 0;
}

/* Percentage based heights */
html,
body {
	height: 100%;
}

/* Set core body defaults */
body {
	line-height: 1.5;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	font-family: var(--ff-mono-inconsolata);
    font-size: var(--fs-500);
    letter-spacing: var(--letter-spacing-1);
    background-color: var(--white);
    color: var(--black);
	z-index: var(--zIndex-1);
}

/* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
ul[role='list'],
ol[role='list'] {
	list-style: none;
}

ul {
	list-style-type: none;
	margin: 0;
	padding: 0;
}

/* Make images, videos and icons easier to work with */
img,
picture,
video,
canvas,
svg {
	display: block;
	max-width: 100%;
}

svg {
	display: inline-block;
}

/* Inherit fonts for inputs and buttons */
input,
button,
textarea,
select {
	font: inherit;
	letter-spacing: inherit;
	word-spacing: inherit;
}

/* More sensible line-wrapping */
p,
h1,
h2,
h3,
h4,
h5,
h6 {
	overflow-wrap: break-word;
	hyphens: auto;
	margin: 0;
	padding: 0;
}

a{
    color: inherit;
    font-size: inherit;
}

/* A elements that don't have a class get default styles */
a:not([class]) {
	text-decoration-skip-ink: auto;
}

/* React Framework Specific */
#root,
#__next {
	isolation: isolate;
    width: 100%;
    height: 100%;
}

aside {
	display: block;
	position: unset;
	width: unset;
}

a {
		text-decoration: none;
	}
	a:hover,
	a:focus {
		color: var(--cream);
	}

.App{
    width: 100%;
    height: 100%;
}

/* Remove all animations, transitions and smooth scroll for people that prefer not to see them */
@media (prefers-reduced-motion: reduce) {
	html:focus-within {
		scroll-behavior: auto;
	}

	*,
	*::before,
	*::after {
		animation-duration: 0.01ms !important;
		animation-iteration-count: 1 !important;
		transition-duration: 0.01ms !important;
		scroll-behavior: auto !important;
	}
}

`
