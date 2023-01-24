import { useState } from 'react'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { db, storage } from '@firebase/index'
import { useAuthContext } from '@contexts/AuthContext'
import { Recipe } from "../types/typings"

const useUploadRecipe = () => {
	const [error, setError] = useState()
	const { currentUser } = useAuthContext()

	const uploadRecipe = ( data: Recipe, imageFile: File ) => {
		const prefix = Date.now()

		if(!imageFile) {
			return null
		}

		const fileRef = ref(storage, `recipes/${prefix}-${imageFile?.name}`)

		const uploadTask = uploadBytesResumable(fileRef, imageFile)

		uploadTask.on('state_changed', (uploadTaskSnapshot) => {
			// setUploadProgress(Math.round((uploadTaskSnapshot.bytesTransferred / uploadTaskSnapshot.totalBytes) * 100))
		}, (e: any) => {
			console.log("Gick inte", e)
			setError(e)
		}, async () => {
			const url = await getDownloadURL(fileRef)

			try {
				await addDoc(collection(db, 'recipes'), {
					title: data.title,
					imageRef: url,
					portions: Number(data.portions),
					cookingTime: Number(data.cookingTime),
					numberOfIngredients: Number(data.numberOfIngredients),
					ingredients: data.ingredients,
					tags: data.tags,
					instructions: data.instructions,
					createdAt: Timestamp.now(),
					createdBy: currentUser?.uid,
				})
			} catch (err: any) {
				setError(err)
			}
		})
	}

	return {
		uploadRecipe,
		error
	}
}

export default useUploadRecipe