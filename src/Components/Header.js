import { StyledHeader } from './styles/Header.styled.js'

import logo from '../assets/logos/scandi-40.png'

import {
	FluentDarkTheme20Filled,
	RiLogoutCircleRLine,
	TablerHome,
	Fa6BrandsWpexplorer,
	GgProfile,
	IcOutlineMessage,
	IcOutlineSearch,
	IcOutlineBookmarks,
	MaterialSymbolsArchiveOutline,
	MaterialSymbolsDrafts,
} from '../Icones'

import { useDispatch, useSelector } from 'react-redux'

import { toggleTheme } from '../Features/themeSlice'

import { useLocalStorage } from '../Hooks'

import { Fragment, useState } from 'react'

import { NavLink, useNavigate } from 'react-router-dom'

import { StyledNavigation } from './styles/PrimaryNavigation.styled'
import { StyledInputSearch } from './styles/InputSearch.styled'
import { logout } from '../Features/userSlice'
import { generateUserInfo } from '../utils/generateUserInfo.js'

function Header() {
	const dispatch = useDispatch()

	const navigate = useNavigate()

	const themeType = useSelector(state => state.theme.themeType)

	// eslint-disable-next-line no-unused-vars
	const [settedTheme, setTheme] = useLocalStorage('theme', 'light')

	// eslint-disable-next-line no-unused-vars
	const [_, userInfo] = generateUserInfo()

	const toggleThemeInHeader = () => {
		const theme = themeType === 'dark' ? 'light' : 'dark'
		dispatch(toggleTheme(theme))
		setTheme(theme)
	}
	const [collapseNav, setCollapseNav] = useState(true)

	const id = useSelector(state => state?.auth?.user?._id)

	const handleLogout = () => {
		dispatch(logout())
		if (!userInfo) {
			navigate('/auth')
		}
	}

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
					<GgProfile />
					<NavLink to={`/user/${id}`}>Profile</NavLink>
				</li>
				<li>
					<IcOutlineBookmarks />
					<NavLink to='/bookmarks'>Bookmarks</NavLink>
				</li>
				<li>
					<MaterialSymbolsDrafts />
					<NavLink to='/drafts'>Drafts</NavLink>
				</li>
				<li>
					<IcOutlineMessage />
					<NavLink to='/messages'>Messages</NavLink>
				</li>
				<li>
					<RiLogoutCircleRLine />
					<button onClick={handleLogout}>Logout</button>
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
