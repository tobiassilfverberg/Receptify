import { useEffect } from "react"
import { useParams } from "react-router-dom"
import useGetRecipe from '@hooks/useGetRecipe'
import RecipeCard from "./RecipeCard"

const ShowRecipe = () => {
	const { title } = useParams()
	const { getRecipe, data } = useGetRecipe()

	useEffect(() => {
		if(!title) {
			return
		}

		getRecipe(title)
	}, [])

	if(!data) {
		return
	} else {
		return (
			<RecipeCard recipe={data} />
		)
	}
}

export default ShowRecipe