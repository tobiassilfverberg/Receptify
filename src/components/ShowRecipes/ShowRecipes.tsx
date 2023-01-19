import RecipeCard from './RecipeCard'
import { Container } from 'react-bootstrap/'
import useGetRecipes from '../../hooks/useGetRecipes'
import styles from './ShowRecipe.module.scss'

const ShowRecipes = () => {
	const { recipes, loading } = useGetRecipes()

	return (
		<Container className={`${styles.root__main}`}>
			<h4>Senast tillagda recept</h4>

			{loading && (
				<p>Laddar recept</p>
			)}

			{recipes && (
				<div className={`${styles.root__wrapper}`}>

					{recipes.map((recipe: Recipe) => (
						<RecipeCard recipe={recipe} />
					))}

				</div>
			)}
		</Container>
	)
}

export default ShowRecipes