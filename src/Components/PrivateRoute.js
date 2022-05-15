import { Outlet, Navigate, useLocation } from 'react-router-dom'

import { useSelector } from 'react-redux'

import { Header, StyledMain } from '../Components'

import { ModalProvider } from '../Providers/ModalProvider'

function PrivateRoute() {
	const userInfo = useSelector(state => state.auth.user)

	const location = useLocation()

	if (!!userInfo?.token)
		return (
			<ModalProvider>
				<Header />
				<StyledMain>
					<Outlet />
				</StyledMain>
			</ModalProvider>
		)
	else
		return <Navigate to='/auth' state={{ from: location }} replace />
}

export default PrivateRoute
