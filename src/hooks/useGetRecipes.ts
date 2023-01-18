import { useEffect, useState } from "react"
import { collection, limit, orderBy, onSnapshot, query } from 'firebase/firestore'
import { db } from "@firebase/index"

const useGetRecipes = () => {
	const [recipes, setRecipes] = useState<any>()
	const [loading, setLoading] = useState<boolean>(false)

	useEffect(() => {
		setLoading(true)
		const queryRef = query(collection(db, 'recipes'), orderBy('createdAt', 'desc'), limit(10))

		const unsubscribe = onSnapshot(queryRef, (snapshot) => {
			const docs = snapshot.docs.map(doc => {
				return {
					...doc.data(),
				}
			})

			setRecipes(docs)
			setLoading(false)
		})

		return unsubscribe
	}, [])

	return {
		recipes,
		loading,
	}
}

export default useGetRecipes