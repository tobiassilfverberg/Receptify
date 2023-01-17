// export interface Ingredient {
// 	amount: number,
// 	unit: string,
// 	ingredient: string,
// }

export interface Inputs {
	title: string,
	portions: number,
	cookingTime: number,
	numberOfIngredients: number,
	ingredients: {amount: number, unit: string, ingredient: string}[],
	tags: string[],
	instructions: string,
}

export interface CreateRecipeFormProps {
	className?: string,
}