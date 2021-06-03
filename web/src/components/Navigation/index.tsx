import React, { useState } from 'react'
import { Navbar, Container, Nav, Image } from 'react-bootstrap'
import { NavLink, Link } from 'react-router-dom'
import logo from '../../assets/images/logo.svg'

const Navigation: React.FC = () => {
  const [expanded, setExpanded] = useState(false)

  return (
    <Navbar
      expanded={expanded}
      onToggle={setExpanded}
      expand="lg"
      className="navigation-component mb-4 mb-lg-0"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <Image src={logo} alt="Donate Hub" fluid />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navigation-donate-hub" />
        <Navbar.Collapse id="navigation-donate-hub">
          <Nav className="ml-auto" onClick={() => setExpanded(false)}>
            <Nav.Link as={NavLink} to="/" exact activeClassName="active">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/sobre" exact activeClassName="active">
              Sobre
            </Nav.Link>
            <Nav.Link as={NavLink} to="/login" exact activeClassName="active">
              Login
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/cadastrar"
              exact
              activeClassName="active"
            >
              Cadastrar
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation
