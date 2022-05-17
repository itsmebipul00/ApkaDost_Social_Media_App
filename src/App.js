import { Routes, Route, BrowserRouter } from 'react-router-dom'

import {
	ScrollToTop,
	PrivateRoute,
	ProtectedRoute,
} from './Components'

import {
	SignInPage,
	ExplorePage,
	HomePage,
	ProfilePage,
	PostPage,
} from './Pages'

import { ThemeProvider } from 'styled-components'

import { useSelector } from 'react-redux'

import { GlobalStyles } from './GlobalStyles'

import { generateThemeColors } from './utils/generateThemeColors'

function App() {
	const themeType = useSelector(state => state.theme.themeType)

	const globalTheme = generateThemeColors(themeType)

	return (
		<ThemeProvider theme={{ globalTheme }}>
			<BrowserRouter basename='/'>
				<GlobalStyles />

				<ScrollToTop>
					<Routes>
						<Route element={<ProtectedRoute />}>
							<Route path='/auth' element={<SignInPage />} />
						</Route>
						<Route element={<PrivateRoute />}>
							<Route
								path={`/userProfile/:id`}
								element={<ProfilePage />}
							/>
							<Route path='/' element={<HomePage />} />
							<Route path='/explore' element={<ExplorePage />} />
							<Route path='/post/:id' element={<PostPage />} />
						</Route>
					</Routes>
				</ScrollToTop>
			</BrowserRouter>
		</ThemeProvider>
	)
}

export default App
