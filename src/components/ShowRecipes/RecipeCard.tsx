import Card from 'react-bootstrap/Card'
import styles from './ShowRecipe.module.scss'
import { RecipeCardProps } from './RecipeCard.types'

const RecipeCard = ({ recipe }: RecipeCardProps) => {
	return (
		<Card key={recipe.title} className={`${styles.root__recipeCard}`}>
			<Card.Img variant="top" src="https://via.placeholder.com/50" />
			<Card.Body>
				<Card.Title className="text-center">{recipe.title}</Card.Title>
				<Card.Text className={`${styles.root__recipeInfo}`}>
					<span>{recipe.cookingTime} min</span>
					<span>{recipe.portions} portioner</span>
				</Card.Text>
			</Card.Body>
		</Card>
	)
}

export default RecipeCard