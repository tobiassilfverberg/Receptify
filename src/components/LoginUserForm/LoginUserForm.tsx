import { useState } from 'react'
import { Alert, Button, Card, Container, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import { SubmitHandler, useForm } from 'react-hook-form'

import { useAuthContext } from '../../contexts/AuthContext'

import { User } from './LoginUserForm.types'
import styles from './LoginUserForm.module.scss'

const LoginUserForm = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	const navigate = useNavigate()
	const { login } = useAuthContext()

	const { register, handleSubmit, formState: { errors }, reset } = useForm<User>()

	const onSubmit: SubmitHandler<User> = async (data) => {
		try {
			setLoading(true)
			await login(data.email, data.password)
			navigate('/skaparecept')
		} catch (err: any) {
			setError(err.message)
			setLoading(false)
		}

	}
	return (
		<Container className={`${styles.root__container} py-3 d-flex justify-content-center align-items-center`}>
			<Card className='w-75'>
				<Card.Body>
					<Card.Title className='mb-3'>
						Logga in på ditt konto
					</Card.Title>

					{error && <Alert variant='danger'>{error}</Alert>}

					<Form onSubmit={handleSubmit(onSubmit)}>
						<Form.Group id='email' className='mb-3'>
							<Form.Label>Email</Form.Label>
							<Form.Control
								{...register("email", {
									required: "Du måste ange en email",
									minLength: {
										value: 6,
										message: "Du måste ange en giltig email"
									}
								})}
								type='email'
								required
							/>
						</Form.Group>

						<Form.Group id='password' className='mb-3'>
							<Form.Label>Lösenord</Form.Label>
							<Form.Control
								{...register("password", {
									required: "Du måste ange ett lösenord",
									minLength: {
											value: 5,
										message: "Ange minst 5 tecken i ditt lösenord"
									}
								})}
								type='password'
								required
							/>
						</Form.Group>

						<Button disabled={loading} type='submit'>
							Logga in
						</Button>
					</Form>

					<div className='text-center mt-3'>
						{/* <Link to='/forgot-password'> */}
							Forgot Password?
						{/* </Link> */}
					</div>
				</Card.Body>
			</Card>
		</Container>
	)
}

export default LoginUserForm