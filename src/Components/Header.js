import { StyledHeader } from './styles/Header.styled.js'

import logo from '../assets/logos/scandi-40.png'

import {
	FluentDarkTheme20Filled,
	RiLogoutCircleRLine,
	TablerHome,
	Fa6BrandsWpexplorer,
	IcOutlineBookmarks,
	GgProfile,
	IcOutlineMessage,
	IcOutlineSearch,
} from '../Icones'

import { useDispatch, useSelector } from 'react-redux'

import { toggleTheme } from '../Features/themeSlice'

import { useLocalStorage } from '../Hooks'

import { Fragment, useState } from 'react'

import { NavLink } from 'react-router-dom'

import { StyledNavigation } from './styles/PrimaryNavigation.styled'
import { StyledInputSearch } from './styles/InputSearch.styled'

function Header() {
	// const { setCollapseNav } = props
	const dispatch = useDispatch()

	const themeType = useSelector(state => state.theme.themeType)

	// eslint-disable-next-line no-unused-vars
	const [settedTheme, setTheme] = useLocalStorage('theme', 'light')

	const toggleThemeInHeader = () => {
		console.log('first')
		const theme = themeType === 'dark' ? 'light' : 'dark'
		dispatch(toggleTheme(theme))
		setTheme(theme)
	}
	const [collapseNav, setCollapseNav] = useState(true)

	//dont show nav on auth page
	//show nava for small scrreens

	return (
		<Fragment>
			<StyledNavigation collapseNav={collapseNav}>
				<li>
					<TablerHome />
					<NavLink to='/'>Home</NavLink>
				</li>
				<li>
					<Fa6BrandsWpexplorer />
					<NavLink to='/explore'>Explore</NavLink>
				</li>
				<li>
					<IcOutlineBookmarks />
					<NavLink to='/bookmark'>BookMarks</NavLink>
				</li>
				<li>
					<GgProfile />
					<NavLink to='/profile'>Profile</NavLink>
				</li>
				<li>
					<IcOutlineMessage />
					<NavLink to='/messages'>Messages</NavLink>
				</li>
				<li>
					<RiLogoutCircleRLine />
					<button>Logout</button>
				</li>
			</StyledNavigation>
			<StyledHeader>
				<img
					src={logo}
					alt='logo'
					onClick={() => setCollapseNav(prev => !prev)}
				/>
				<span>
					<StyledInputSearch />
					<IcOutlineSearch />
				</span>
				<FluentDarkTheme20Filled
					className='theme-toggler'
					onClick={toggleThemeInHeader}
				/>
			</StyledHeader>
		</Fragment>
	)
}

export default Header
