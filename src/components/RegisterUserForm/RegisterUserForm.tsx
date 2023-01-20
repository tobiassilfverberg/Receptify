import { useState } from 'react'
import { Alert, Button, Card, Container, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

import { SubmitHandler, useForm } from 'react-hook-form'

import { User } from './RegisterUserForm.types'

import { useAuthContext } from '@contexts/AuthContext'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@firebase/index'

import styles from './RegisterUserForm.module.scss'

const RegisterUserForm = () => {
	const [error, setError] = useState<string>()
	const [loadingCreateAdmin, setLoadingCreateAdmin] = useState(false)
	const { register: registerUser } = useAuthContext()
	const navigate = useNavigate()

	const { register, handleSubmit, formState: { errors }, reset } = useForm<User>()

	const onSubmit: SubmitHandler<User> = async (data) => {
		// make sure user has entered the same password in both input fields
		if (data.password !== data.passwordConfirm) {
			return setError("The passwords does not match")
		}

		// try to sign up the user with the specified credentials
		try {
			setLoadingCreateAdmin(true)

			await registerUser(data.email, data.password)

			await addDoc(collection(db, 'users'), {
				email: data.email,
				username: data.username,
			})

			reset()
			navigate("/loggain")
			setLoadingCreateAdmin(false)
		} catch (err) {
			setLoadingCreateAdmin(false)
		}
	}

	return (
		<Container className={`${styles.root__container}`}>
			<Card className='w-75'>
				<Card.Body>
					<Card.Title className='mb-3'>
						Registrera ett konto
					</Card.Title>

					<Form onSubmit={handleSubmit(onSubmit)}>
						<Form.Group id="email" className="mb-1">
							<Form.Label>Email</Form.Label>
							<Form.Control
								{...register("email", {
									required: "Du måste ange en email",
									minLength: {
										value: 6,
										message: "Du måste ange en giltig email"
									}
								})}
								type="email"
							/>
						</Form.Group>

						<Form.Group id="username" className="mb-1">
							<Form.Label>Användarnamn</Form.Label>
							<Form.Control
								{...register("username", {
									required: "Du måste ange ett namn",
									minLength: {
										value: 3,
										message: "Du måste ange en normalt namn"
									}
								})}
								type="text"
							/>
						</Form.Group>

						<Form.Group id="password" className="mb-1">
							<Form.Label>Lösenord</Form.Label>
							<Form.Control
								{...register("password", {
									required: "Du måste ange ett lösenord",
									minLength: {
										value: 5,
										message: "Ange minst 5 tecken i ditt lösenord"
									}
								})}
								type="password"
							/>
						</Form.Group>

						<Form.Group id="password-confirm" className="mb-1">
							<Form.Label>Bekräfta lösenord</Form.Label>
							<Form.Control
								{...register("passwordConfirm", {
									required: "Du måste matcha ditt lösenord",
									minLength: {
										value: 5,
										message: "Du måste ange samma lösenord"
									}
								})}
								type="password"
							/>
						</Form.Group>

						<Button disabled={loadingCreateAdmin} type="submit" className="mt-1">Skapa konto</Button>
					</Form>

					<div className='text-center mt-3'>
						<Link to='/loggain'>
							Har du redan ett konto? Klicka här för att logga in
						</Link>
					</div>

				</Card.Body>
			</Card>
			{/* {errors.title && (<Alert className="mt-2" variant="danger">{errors.title.message}</Alert>)} */}
			{error && (<Alert className="mt-2" variant="danger">{error}</Alert>)}
		</Container>
	)
}

export default RegisterUserForm