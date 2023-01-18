import { createContext, useContext, useEffect, useState } from "react"

import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	UserCredential,
} from "firebase/auth"
import { auth } from "@firebase/index"

interface AuthContextType {
	login: (email: string, password: string) => Promise<UserCredential>,
}

const AuthContext = createContext<AuthContextType | null>(null)

const useAuthContext = () => {
	return useContext(AuthContext) as AuthContextType
}

const AuthContextProvider = ({ children }: any) => {
	const [currentUser, setCurrentUser] = useState<any>()
	const [username, setUsername] = useState(null)
	const [email, setEmail] = useState(null)
	const [loading, setLoading] = useState(true)

	const register = (email: string, password: string) => {
		return createUserWithEmailAndPassword(auth, email, password)
	}

	const login = (email: string, password: string) => {
		return signInWithEmailAndPassword(auth, email, password)
	}

	const reloadUser = async () => {
		// await auth.currentUser.reload()
		setCurrentUser(auth.currentUser)
		//setUsername(auth.currentUser?.username)
		//setEmail(auth.currentUser?.email)
		return true
	}

	useEffect(() => {
		// listen for auth-state changes
		const unsubscribe = onAuthStateChanged(auth, user => {
			setCurrentUser(user)
			// setUsername(user?.username)
			// setEmail(user?.email)
			setLoading(false)
		})

		return unsubscribe
	}, [])

	const contextValues = {
		// here be everything the children needs/should be able to use
		currentUser,
		login,
		reloadUser,
		username,
		email,
	}

	return (
		<AuthContext.Provider value={contextValues}>
			{loading ? (
				<div id='initial-loader'>
					<p>Loading...</p>
				</div>
			) : (
				children
			)}
		</AuthContext.Provider>
	)
}

export { AuthContextProvider as default, useAuthContext }