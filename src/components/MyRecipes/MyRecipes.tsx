import { useEffect } from 'react'
import { Container, ListGroup, ListGroupItem } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import useGetMyRecipes from '@hooks/useGetMyRecipes'
import styles from './MyRecipes.module.scss'
import { Recipe } from "../../types/typings"

const MyRecipes = () => {
	const { getRecipes, recipes } = useGetMyRecipes()
	const navigate = useNavigate()

	useEffect(() => {
		getRecipes()
	}, [])

	return (
		<Container className={`${styles.root}`}>
			<h3>Mina recept</h3>
			<ListGroup>
				{recipes?.map((recipe: Recipe) => (
					<ListGroupItem
					key={recipe.id}
					onClick={() => {
						navigate(`/recept/${recipe.title}`)
					}}>
					<div className={`${styles.root__flex}`}>
						<div>
							<h5>{recipe.title}</h5>
							<div>{recipe.tags.join(', ')}</div>
							<div>{recipe.portions} portioner</div>
							<div>{recipe.cookingTime} minuter</div>
						</div>
						<img src={recipe.imageRef} />
					</div>
					</ListGroupItem>
				))}
			</ListGroup>
		</Container>
	)
}

export default MyRecipes