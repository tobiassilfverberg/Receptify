import { useState } from 'react'
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import { Recipe } from '../../types/typings'
import styles from './ShowRecipe.module.scss'

interface IProps {
	recipe: Recipe,
}

const RecipeCard: React.FC<IProps> = ({ recipe }) => {
	const [portionsCount, setPortionsCount] = useState<number>(recipe.portions)

	return (
		<Card>
			<Card.Img src={recipe.imageRef} className={`${styles.root__recipeImg}`} />
			<Card.Body>
				<Card.Title className={`${styles.root__cardTitle}`}>{recipe.title}</Card.Title>
					<div className={`${styles.root__wrapper}`}>
						<div className={`${styles.root__infoTextSM}`}>
							<div className={`${styles.root__textUnderline}`}>Taggar: </div>{recipe.tags.join(', ')}
						</div>
						<div className={`${styles.root__infoTextSM}`}>
							<div className={`${styles.root__textUnderline}`}>Tillagningstid: </div>
							<span>{recipe.cookingTime} minuter</span>
						</div>
					</div>
					<div className={`${styles.root__box}`}>
						<div className={`${styles.root__infoTextLG}`}>
							<div className={`${styles.root__textUnderline}`}>
								Ingredienser
							</div>
							<div className={`${styles.root__portionCounter}`}>
								Antal portioner: {recipe.portions && (
									<>
										<span className={`${styles.root__spanButton}`} onClick={() => {
										if((portionsCount - 1) > 0) {
											setPortionsCount(portionsCount - 1)
										}
										}}> - </span>
										<span>{portionsCount}</span>
										<span className={`${styles.root__spanButton}`} onClick={() => {
											setPortionsCount(portionsCount + 1)
										}}> + </span>
									</>
								)}
							</div>
							<div>
								<ListGroup variant="flush">
									{recipe.ingredients.map((type: {
										amount: number,
										unit: string,
										ingredient: string
									}) => (
										<ListGroupItem key={type.ingredient}>
											<span> {(Number(type.amount) / recipe.portions) * portionsCount} </span>
											<span> {type.unit} </span>
											<span> {type.ingredient} </span>
										</ListGroupItem>
									))}
								</ListGroup>
							</div>
						</div>
						<div className={`${styles.root__infoTextLG}`}>
							<div className={`${styles.root__textUnderline}`}>
								Instruktioner
							</div>
							{recipe.instructions}
						</div>
					</div>
			</Card.Body>
		</Card>
	)
}

export default RecipeCard