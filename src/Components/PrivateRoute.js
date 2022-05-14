import { Outlet, Navigate, useLocation } from 'react-router-dom'

import { useSelector } from 'react-redux'

function PrivateRoute() {
	const userInfo = useSelector(state => state.auth.user)

	const location = useLocation()

	if (!!userInfo?.token) return <Outlet />
	else
		return <Navigate to='/auth' state={{ from: location }} replace />
}

export default PrivateRoute
