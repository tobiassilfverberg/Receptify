import { useEffect, useState } from "react"
import { collection,
	DocumentData,
	limit,
	doc,
	getDocs,
	orderBy,
	onSnapshot,
	query,
	Query,
	QuerySnapshot,
	where }
from 'firebase/firestore'
import { db } from "@firebase/index"
import { Recipe } from "../types/typings"

const useGetRecipe = () => {
	const [data, setData] = useState<Recipe | null>(null)

	const getRecipe = async (title: string) => {
		const q = query(collection(db, "recipes"), where("title", "==", title))

		if(!q) {
			return null
		}

		const querySnapshot = await getDocs(q)
		querySnapshot.forEach((doc) => {
			setData(doc.data() as Recipe)
		})
	}

	return {
		data,
		getRecipe,
	}
}

export default useGetRecipe