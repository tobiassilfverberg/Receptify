import { Container, Navbar, Nav } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'

import { useAuthContext } from '@contexts/AuthContext'

const Navigation = () => {
	const { currentUser } = useAuthContext()

	return (
		<Navbar expand="md" bg="dark" variant="dark" collapseOnSelect>
			<Container fluid>
			<Navbar.Brand as={Link} to='/'>
				<span>Receptify</span>
			</Navbar.Brand>

			<Navbar.Toggle aria-controls="responsive-navbar" />
				<Navbar.Collapse id="responsive-navbar">
					<Nav className="ms-auto">
						{currentUser ? (
							<>
								<Nav.Link as={NavLink} end to="/skaparecept">
									Skapa recept
								</Nav.Link>
								<Nav.Link as ={NavLink} end to="/minarecept">
									Mina recept
								</Nav.Link>
								<Nav.Link as={NavLink} end to="/loggaut">
									Logga ut
								</Nav.Link>
							</>
						) : (
							<>
								<Nav.Link as={NavLink} end to="/loggain">
									Logga in
								</Nav.Link>
								<Nav.Link as={NavLink} end to="/registrera">
									Registrera konto
								</Nav.Link>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigation