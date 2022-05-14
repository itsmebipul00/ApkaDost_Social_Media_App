export function generateThemeColors(themeType) {
	const globalTheme = {
		theme:
			themeType === 'light'
				? {
						dark: '#000000',
						white: '#151b26',
						black: '#ffffff',
						gray: '#727272',
						cream: '#eeebea',
				  }
				: {
						dark: '#000000',
						white: '#ffffff',
						black: '#151b26',
						gray: '#eeebea',
						cream: '#727272',
				  },
	}
	return globalTheme
}
