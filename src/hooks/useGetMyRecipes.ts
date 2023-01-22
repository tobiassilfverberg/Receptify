import { useEffect, useState } from "react"
import { collection,
	DocumentData,
	onSnapshot,
	query,
	QuerySnapshot,
	where }
from 'firebase/firestore'
import { db } from "@firebase/index"
import { useAuthContext } from "@contexts/AuthContext"

const useGetMyRecipes = () => {
	const [recipes, setRecipes] = useState<Recipe[] | null>(null)
	const [loading, setLoading] = useState<boolean>(false)

	const { currentUser } = useAuthContext()

	const getRecipes = () => {
		setLoading(true)

		const queryRef = query(collection(db, 'recipes'), where('createdBy', '==', currentUser?.uid))

		if(!queryRef) {
			return null
		}

		const unsubscribe = onSnapshot(queryRef, (snapshot: QuerySnapshot) => {
			const docs = snapshot.docs.map((doc: DocumentData) => {
				return {
					...doc.data(),
				}
			})

			setRecipes(docs)

			setLoading(false)
		})

		return unsubscribe
	}

	useEffect(() => {
	}, [])

	return {
		getRecipes,
		recipes,
		loading,
	}
}

export default useGetMyRecipes