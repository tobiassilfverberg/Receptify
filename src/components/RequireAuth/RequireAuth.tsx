import { Navigate } from 'react-router-dom'
import { useAuthContext } from '@contexts/AuthContext'

const RequireAuth = ({ children }: {children: JSX.Element}) => {
	const { currentUser } = useAuthContext()

	if (!currentUser) {
		return <Navigate to="/loggain" />
	}

	return children
}

export default RequireAuth