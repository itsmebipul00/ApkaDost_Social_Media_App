export function generateThemeColors(themeType) {
	const globalTheme = {
		theme:
			themeType === 'light'
				? {
						white: '#151b26',
						black: '#ffffff',
						gray: '#727272',
						cream: '#eeebea',
				  }
				: {
						white: '#ffffff',
						black: '#151b26',
						gray: '#eeebea',
						cream: '#727272',
				  },
	}
	return globalTheme
}
