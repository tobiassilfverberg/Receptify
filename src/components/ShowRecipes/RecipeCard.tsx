import Card from 'react-bootstrap/Card'
import styles from './ShowRecipe.module.scss'
import { RecipeCardProps } from './RecipeCard.types'
import { Link } from 'react-router-dom'

const RecipeCard = ({ recipe }: RecipeCardProps) => {
	return (
		<Card as={Link} to={`recept/${recipe.title}`} key={recipe.imageRef} className={`${styles.root__recipeCard}`}>
			<Card.Img className={`${styles.root__cardImg}`} variant="top" src={recipe.imageRef ? recipe.imageRef : "https://via.placeholder.com/50"} />
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