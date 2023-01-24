import { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import { SubmitHandler, useForm, FieldValues } from 'react-hook-form'
import RecipeCard from './RecipeCard'
import { Container, Button, ButtonGroup } from 'react-bootstrap'
import useGetRecipes from '@hooks/useGetRecipes'
import { Recipe } from "../../types/typings"
import styles from './ShowRecipe.module.scss'

const tagArray = ["Alla", "Kyckling", "Torsk", "Fläsk", "Nöt", "Pasta", "Potatis", "Ris", "Korv", "Lax", "Vegetariskt", "Köttfärs", "Skaldjur", "Frukost", "Lunch", "Mellanmål", "Förrätt", "Varmrätt", "Efterrätt", "Bakverk"]

const ShowRecipes = () => {
	const [searchInput, setSearchInput] = useState<string>('')
	const [searchTag, setSearchTag] = useState<string>('')
	const [filteredRecipes, setFilteredRecipes] = useState<Recipe[] | null | undefined>(null)
	const { getRecipes, recipes } = useGetRecipes()

	const { register, handleSubmit, formState: { errors }, watch } = useForm()
	const watchTag = watch('tags')

	useEffect(() => {
		const subscription = watch((value) => {
			setSearchTag(value.tags)
		})

		return () => subscription.unsubscribe()
	}, [watchTag])

	const onSubmit: SubmitHandler<FieldValues> = (data: any) => {
		getRecipes(data.tags)
	}

	const onSearch: SubmitHandler<FieldValues> = (data: any) => {
		const filtered = recipes?.filter((recipe: Recipe) => {
			return (
				recipe.recipe.title.toLowerCase().includes(data.searchName.toLowerCase())
			)
		})

		setFilteredRecipes(filtered)
	}

	useEffect(() => {
		getRecipes(searchTag)
	}, [searchTag])

	useEffect(() => {
		getRecipes('Alla')
	}, [])

	return (
		<Container className={`${styles.root__main}`}>
			<h4>Senast tillagda recept</h4>

			<Form
				onSubmit={handleSubmit(onSubmit)}
				className={`${styles.root__searchForms}`}
			>
				<Form.Label>Välj tag</Form.Label>
				<Form.Select
					{...register('tags')}
					className="w-50"
				>
					{tagArray.map((tag) => (
						<option key ={`${tag}`} value={`${tag}`}>{`${tag}`}</option>
					))}
				</Form.Select>
				<ButtonGroup>
					<Button type="submit" className='mt-2'>Sök</Button>
					<Button type="reset" className="mt-2" variant="warning" onClick={() =>{
						setSearchTag('Alla')
						getRecipes('Alla')
					}
					}>Återställ</Button>
				</ButtonGroup>
			</Form>

			<Form onSubmit={handleSubmit(onSearch)} className={`${styles.root__searchForms}`}>
					<Form.Label>Sök efter titel</Form.Label>
					<Form.Control
						{...register('searchName')}
						type="text"
						onChange={(e) => setSearchInput(e.target.value)}
						className="w-50"
					/>
					<ButtonGroup>
						<Button type="submit" className='mt-2'>Sök</Button>
						<Button type="reset" className="mt-2" variant="warning" onClick={() => {
							setSearchInput('')
						setFilteredRecipes(null)
						}}>Återställ</Button>
					</ButtonGroup>
			</Form>

			{/* {loading && (
				<p>Laddar recept</p>
			)} */}

			{(searchInput && filteredRecipes?.length === 0) && (
				<p>Prova en annan sökning</p>
			)}

			{filteredRecipes? (
				<div className={`${styles.root__wrapper}`}>

					{filteredRecipes?.map((recipe: Recipe) => (
						<RecipeCard key={recipe.id} recipe={recipe} />
					))}

				</div>
			) : (
				<div className={`${styles.root__wrapper}`}>

					{recipes?.map((recipe: Recipe) => (
						<RecipeCard key={recipe.id} recipe={recipe} />
					))}

				</div>
			)}

		</Container>
	)
}

export default ShowRecipes