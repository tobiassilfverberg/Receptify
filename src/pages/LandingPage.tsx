import Container from 'react-bootstrap/Container'
import ShowRecipes from '@components/ShowRecipes'

const LandingPage = () => {
	return (
		<Container>
			<h3>Välkommen till Receptify</h3>

			<ShowRecipes />
		</Container>
	)
}

export default LandingPage