import { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'

import { SubmitHandler, useForm } from 'react-hook-form'

import { User } from './RegisterUserForm.types'

import { createUserWithEmailAndPassword } from 'firebase/auth'
import { collection, addDoc } from 'firebase/firestore'
import { auth, db } from '@firebase/index'

const RegisterUserForm = () => {
	const [error, setError] = useState<string>()
	const [loadingCreateAdmin, setLoadingCreateAdmin] = useState(false)

	const { register, handleSubmit, formState: { errors }, reset } = useForm<User>()

	const onSubmit: SubmitHandler<User> = async (data) => {
		// make sure user has entered the same password in both input fields
		if (data.password !== data.passwordConfirm) {
			return setError("The passwords does not match")
		}

		// try to sign up the user with the specified credentials
		try {
			setLoadingCreateAdmin(true)

			await createUserWithEmailAndPassword(auth, data.email, data.password)

			await addDoc(collection(db, 'users'), {
				email: data.email,
				username: data.username,
			})

			reset()
			setLoadingCreateAdmin(false)
		} catch (err) {
			setLoadingCreateAdmin(false)
		}
	}

	return (
		<Container className="mt-3 mb-3 text-light">
			<h3>Add admin: </h3>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Form.Group id="email" className="mb-1">
					<Form.Control
						{...register("email", {
							required: "Du måste ange en email",
							minLength: {
								value: 6,
								message: "Du måste ange en giltig email"
							}
						})}
						placeholder="Email"
						type="email"
					/>
				</Form.Group>

				<Form.Group id="username" className="mb-1">
					<Form.Control
						{...register("username", {
							required: "Du måste ange ett namn",
							minLength: {
								value: 3,
								message: "Du måste ange en normalt namn"
							}
						})}
						placeholder="Namn"
						type="text"
					/>
				</Form.Group>

				<Form.Group id="password" className="mb-1">
					<Form.Control
						{...register("password", {
							required: "Du måste ange ett lösenord",
							minLength: {
								value: 5,
								message: "Ange minst 5 tecken i ditt lösenord"
							}
						})}
						placeholder="Lösenord"
						type="password"
					/>
				</Form.Group>

				<Form.Group id="password-confirm" className="mb-1">
					<Form.Control
						{...register("passwordConfirm", {
							required: "Du måste matcha ditt lösenord",
							minLength: {
								value: 5,
								message: "Du måste ange samma lösenord"
							}
						})}
						placeholder="Bekräfta lösenord"
						type="password"
					/>
				</Form.Group>

				<Button disabled={loadingCreateAdmin} type="submit" className="mt-1">Create Admin</Button>
			</Form>

			{/* {errors.title && (<Alert className="mt-2" variant="danger">{errors.title.message}</Alert>)} */}
			{error && (<Alert className="mt-2" variant="danger">{error}</Alert>)}
		</Container>
	)
}

export default RegisterUserForm