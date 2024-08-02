import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

function Menu() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">Ma Diet</Navbar.Brand>      
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title="Aliment" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/fruits">Fruits</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/legumes">Légumes</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/viandes">Viandes</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/poissons">Poissons</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/noix">Noix</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Repas" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/dejeuner">Déjeuner</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/petit-dejeuner">Petit Déjeuner</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/diner">Dîner</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/colation">Colation</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link as={Link} to="/suivit">Suivit</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Menu;
