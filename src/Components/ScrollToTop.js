import { useEffect } from 'react'

import { useLocation } from 'react-router-dom'

function ScrollToTop({ children }) {
	const location = useLocation()
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [location])
	return <div className='App'>{children}</div>
}

export default ScrollToTop
