import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '@contexts/AuthContext'

const LogoutPage = () => {
	const navigate = useNavigate()
	const { signOutUser } = useAuthContext()

	useEffect(() => {
		const logoutUser = () => {
			signOutUser()
			navigate('/')
		}

		logoutUser()
	}, [])

	return (
		<div>Du loggas ut</div>
	)
}

export default LogoutPage