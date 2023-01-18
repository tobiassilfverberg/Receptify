import { Routes, Route } from 'react-router-dom'
import CreateRecipe from "@pages/CreateRecipe"
import LandingPage from '@pages/LandingPage'
import LoginUserPage from '@pages/LoginUserPage'
import RegisterUserPage from '@pages/RegisterUserPage'
import '@styles/App.scss'

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/loggain" element={<LoginUserPage />} />
				<Route path="/registrera" element={<RegisterUserPage />} />
				<Route path="/skaparecept" element={<CreateRecipe />} />
			</Routes>
		</div>
	)
}

export default App
