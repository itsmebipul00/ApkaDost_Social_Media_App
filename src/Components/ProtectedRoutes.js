import { Outlet, Navigate, useLocation } from 'react-router-dom'

import { useSelector } from 'react-redux'

function PrivateRoute() {
	const userInfo = useSelector(state => state.auth.user)

	const location = useLocation()

	if (userInfo)
		return <Navigate to='/' state={{ from: location }} replace />
	else return <Outlet />
}

export default PrivateRoute
