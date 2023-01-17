import CreateRecipeForm from '@components/CreateRecipeForm'

const CreateRecipe = () => {
	return (
		<div className="container">
			<h3 className='mt-2'>Här kan du lägga till ett nytt recept</h3>

			<CreateRecipeForm />
		</div>
	)
}

export default CreateRecipe