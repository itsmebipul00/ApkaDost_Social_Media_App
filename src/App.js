import { Routes, Route, BrowserRouter } from 'react-router-dom'

import {
	ScrollToTop,
	Header,
	PrivateRoute,
	ProtectedRoute,
} from './Components'

import { SignInPage, HomePage } from './Pages'

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
					<Header />
					<Routes>
						<Route element={<ProtectedRoute />}>
							<Route path='/auth' element={<SignInPage />} />
						</Route>
						<Route element={<PrivateRoute />}>
							<Route path='/' element={<HomePage />} />
						</Route>
					</Routes>
				</ScrollToTop>
			</BrowserRouter>
		</ThemeProvider>
	)
}

export default App
