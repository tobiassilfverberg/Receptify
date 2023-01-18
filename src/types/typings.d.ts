interface Recipe {
	title: string,
	portions: number,
	cookingTime: number,
	numberOfIngredients: number,
	ingredients: {amount: number, unit: string, ingredient: string}[],
	tags: string[],
	instructions: string,
}