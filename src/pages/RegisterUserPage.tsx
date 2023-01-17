import React from 'react'

import Container from 'react-bootstrap/Container'

import RegisterUserForm from '@components/RegisterUserForm'

const RegisterUserPage = () => {
	return (
		<Container>
			<h3>Registrera dig som användare</h3>

			<RegisterUserForm />

			<p>Har du redan ett konto?</p>
			<p>Klicka här för att logga in</p>
		</Container>
	)
}

export default RegisterUserPage