import { useEffect, useState } from "react"
import { collection,
	DocumentData,
	limit,
	orderBy,
	onSnapshot,
	query,
	Query,
	QuerySnapshot,
	where }
from 'firebase/firestore'
import { db } from "@firebase/index"
import { Recipe } from "../types/typings"

const useGetRecipes = () => {
	const [recipes, setRecipes] = useState<Recipe[] | null>(null)
	const [loading, setLoading] = useState<boolean>(false)
	const [queryRef, setQueryRef] = useState<Query<DocumentData> | null>(query(collection(db, 'recipes'), orderBy('createdAt', 'desc'), limit(10)))

	const getRecipes = (searchTag: string) => {
		setLoading(true)

		if(searchTag === "Alla") {
			setQueryRef(query(collection(db, 'recipes'), orderBy('createdAt', 'desc'), limit(9)))
		} else {
			setQueryRef(query(collection(db, 'recipes'), orderBy('createdAt', 'desc'), where('tags', 'array-contains-any', [`${searchTag}`])))
		}

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

export default useGetRecipes