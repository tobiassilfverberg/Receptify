import { useEffect, useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { SubmitHandler, useForm } from 'react-hook-form'

import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { db } from '@firebase/index'

import { CreateRecipeFormProps, Inputs } from './CreateRecipeForm.types'

import styles from './CreateRecipeForm.module.scss'

const tagArray = ["Torsk", "Fläsk", "Nöt", "Pasta", "Potatis", "Ris", "Korv", "Lax", "Vegetariskt", "Köttfärs", "Skaldjur"]

const CreateRecipeForm = ({ className }:CreateRecipeFormProps) => {
	const [error, setError] = useState(false)
	const [ingredientCount, setIngredientCount] = useState<string[]>()

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		watch,
	} = useForm<Inputs>()

	const onSubmit: SubmitHandler<Inputs> = async data => {
		try {
			await addDoc(collection(db, 'recipes'), {
				title: data.title,
				portions: data.portions,
				cookingTime: data.cookingTime,
				numberOfIngredients: data.numberOfIngredients,
				ingredients: data.ingredients,
				tags: data.tags,
				instructions: data.instructions,
				createdAt: Timestamp.now(),
			})
		} catch (err: any) {
			setError(err)
		}
		console.log(data)

		reset()
	}

	const watchIngredientCount = Number(watch(["numberOfIngredients"]))

	useEffect(() => {
		const subscription = watch((value) => {
			let data = []
			let length = Number(value.numberOfIngredients)

			for(let i = 0; i < length; i++) {
				data.push("ingredient")
			}

			setIngredientCount(data)
		})

		return () => subscription.unsubscribe()
	}, [watchIngredientCount])

	return (
		<Form
			className={
				`${styles.root, className} p-1 w-100`
			}
			onSubmit={handleSubmit(onSubmit)}
		>
			<Form.Group controlId='title' className="mb-3">
				<Form.Label className={styles.root__label}>Receptets namn</Form.Label>
				<Form.Control
					{...register('title', {
						required: 'Receptet behöver ett namn',
						minLength: {
							value: 3,
							message: "För kort för att vara ett namn på en maträtt",
						},
					})}
					type='text'
					required
					className={`${styles.root__inputField100}`}
				/>
				<Form.Text>Vad är receptets namn</Form.Text>
			</Form.Group>

			<Form.Group controlId='portions' className="mb-3">
				<Form.Label>Antal portioner</Form.Label>
				<Form.Control
					{...register('portions', {
						required: 'Receptet behöver antal portioner',
					})}
					type='number'
					className={`${styles.root__inputField50}`}
				/>
				<Form.Text>Hur många portioner är receptet för</Form.Text>
			</Form.Group>

			<Form.Group controlId='cookingTime' className='mb-3'>
				<Form.Label>Tillagningstid i minuter</Form.Label>
				<Form.Control
					{...register('cookingTime', {
						required: 'Receptet behöver en tillagninstid',
					})}
					type='number'
					className={`${styles.root__inputField50}`}
				/>
				<Form.Text>Tillagningstid i minuter</Form.Text>
			</Form.Group>

			<Form.Group controlId='numberOfIngredients' className='mb-3'>
				<Form.Label>Antal ingredienser</Form.Label>
				<Form.Control
					{...register('numberOfIngredients', {
						required: "Mängd behövs"
					})}
					type="number"
					className={`${styles.root__inputField50}`}
				/>
				<Form.Text>Ange antalet ingredienser</Form.Text>
			</Form.Group>

			<Form.Group controlId='ingredients' className="mb-3">
				<Form.Label>Ingredienser</Form.Label>

				{ingredientCount?.map((item, index) => (
					<div className="d-flex mb-3 justify-content-between align-items-center" key={index}>
						<Form.Control
							{...register(`ingredients.${index}.amount`, {
								required: "Mängd behövs"
							})}
							type="number"
							placeholder='Mängd'
							className={`${styles.root__inputField25} me-2`}
						/>

						<Form.Select
							className={`${styles.root__inputField25} me-2 d-flex`}
							{...register(`ingredients.${index}.unit`)}
							aria-label='unit'
							placeholder='Välj enhet'
						>
							<option>Välj enhet</option>
							<optgroup label="Vikt">
								<option value='kg'>kg</option>
								<option value='hg'>hg</option>
								<option value='gr'>gr</option>
							</optgroup>
							<optgroup label="Volym">
								<option value='liter'>liter</option>
								<option value='dl'>dl</option>
								<option value='cl'>cl</option>
								<option value='ml'>ml</option>
								<option value='tsk'>tsk</option>
								<option value='msk'>msk</option>
							</optgroup>
						</Form.Select>

						<Form.Control
							{...register(`ingredients.${index}.ingredient`)}
							type="text"
							placeholder='Ingrediens'
							className={`${styles.root__inputField50}`}
						/>
					</div>
				))}
			</Form.Group>

			<Form.Group controlId='tags' className='mb-3'>
				<Form.Label>Välj taggar för ditt recept</Form.Label>
					{tagArray.map((tag) => (
						<div key={`${tag}`}>
							<Form.Check
								{...register('tags', {
									required: false,
								})}
								type="checkbox"
								id={`${tag}`}
								label={`${tag}`}
								value={`${tag}`}
							/>
						</div>
					))}
				<Form.Text>Välj taggar som liknar dina ingredienser</Form.Text>
			</Form.Group>

			<Form.Group controlId='instructions' className="mb-3">
				<Form.Label>Instruktioner</Form.Label>
				<Form.Control
					{...register('instructions', {
						required: "Ange instruktioner för hur receptet tillagas"
					})}
					as="textarea"
					rows={4}
					className={`${styles.root__textArea}`}
				/>
				<Form.Text>Receptets instruktioner</Form.Text>
			</Form.Group>

			{error && <Alert className='danger'>{error}</Alert>}
			<Button variant="success" type='submit'>Submit</Button>
		</Form>
	)
}

export default CreateRecipeForm