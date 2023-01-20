import { Routes, Route } from 'react-router-dom'
import CreateRecipe from "@pages/CreateRecipe"
import LandingPage from '@pages/LandingPage'
import LoginUserPage from '@pages/LoginUserPage'
import LogoutPage from '@pages/LogoutPage'
import RegisterUserPage from '@pages/RegisterUserPage'
import RequireAuth from '@components/RequireAuth'
import Navigation from '@components/Navigation'
import '@styles/App.scss'

function App() {
	return (
		<div className="App">
			<Navigation />

			<Routes>
				{/* Public routes */}
				<Route path="/" element={<LandingPage />} />
				<Route path="/loggain" element={<LoginUserPage />} />
				<Route path="/loggaut" element={<LogoutPage />} />
				<Route path="/registrera" element={<RegisterUserPage />} />

				{/* Protected routes */}
				<Route path="/skaparecept" element={
					<RequireAuth>
						<CreateRecipe />
					</RequireAuth>
				} />
			</Routes>
		</div>
	)
}

export default App
