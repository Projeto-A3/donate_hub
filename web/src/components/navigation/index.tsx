import React from 'react'
import { Navbar, Container, Nav, Image } from 'react-bootstrap'
import { NavLink, Link } from 'react-router-dom'
import logo from '../../assets/images/logo.svg'

const Navigation: React.FC = () => {
  return (
    <Navbar className="navigation-component">
      <Container>
        <Navbar.Brand>
          <Link to="/">
            <Image src={logo} alt="Donate Hub" fluid />
          </Link>
        </Navbar.Brand>
        <div className="form-inline">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav.Link as={NavLink} to="/" activeClassName="active">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/sobre">
              Sobre
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contato">
              Contato
            </Nav.Link>
            <Nav.Link as={NavLink} to="/login">
              Login
            </Nav.Link>
            <Nav.Link as={NavLink} to="/cadastrar">
              Cadastrar
            </Nav.Link>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  )
}

export default Navigation
