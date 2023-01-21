import { useEffect } from "react"
import { Card } from 'react-bootstrap'
import { useParams } from "react-router-dom"
import useGetRecipe from '@hooks/useGetRecipe'
import styles from './ShowRecipe.module.scss'

const ShowRecipe = () => {
	const { title } = useParams()
	const { getRecipe, data } = useGetRecipe()

	console.log("Recept är", data)

	useEffect(() => {
		if(!title) {
			return
		}

		getRecipe(title)
	}, [])
	return (
		<Card>
			<Card.Img src={data?.imageRef} variant="top" className={`${styles.root__recipeImg}`} />
			<Card.Body>
				<Card.Title className={`${styles.root__cardTitle}`}>{data?.title}</Card.Title>
			</Card.Body>
		</Card>
	)
}

export default ShowRecipe