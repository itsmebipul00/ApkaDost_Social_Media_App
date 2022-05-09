import { StyledHeader } from './styles/Header.styled.js'

import logo from '../assets/logos/scandi-40.png'

import { FluentDarkTheme20Filled } from '../Icones'

import { useDispatch, useSelector } from 'react-redux'

import { toggleTheme } from '../Features/themeSlice'

import { useLocalStorage } from '../Hooks'

function Header() {
	const dispatch = useDispatch()

	const themeType = useSelector(state => state.theme.themeType)

	// eslint-disable-next-line no-unused-vars
	const [settedTheme, setTheme] = useLocalStorage('theme', 'light')

	const toggleThemeInHeader = () => {
		const theme = themeType === 'dark' ? 'light' : 'dark'
		dispatch(toggleTheme(theme))
		setTheme(theme)
	}

	return (
		<StyledHeader>
			<img src={logo} alt='logo' />
			<h1>NEXTXT</h1>
			<FluentDarkTheme20Filled onClick={toggleThemeInHeader} />
		</StyledHeader>
	)
}

export default Header
