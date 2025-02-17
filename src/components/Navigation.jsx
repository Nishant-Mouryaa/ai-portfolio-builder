// components/Navigation.jsx
import React from 'react';
import { Navbar, Container, Nav, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import './Navigation.css';

function Navigation() {
  const { state } = usePortfolio();
  const { user } = state;

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="custom-nav">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="brand-text">
          AI Portfolio Builder
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-content" />
        <Navbar.Collapse id="navbar-content" className="justify-content-end">
          <Nav>
            <Nav.Link as={Link} to="/features">Features</Nav.Link>
            <Nav.Link as={Link} to="/pricing">Pricing</Nav.Link>
            <Nav.Link as={Link} to="/profile" className="d-flex align-items-center">
              {user.avatarUrl ? (
                <Image
                  src={user.avatarUrl}
                  roundedCircle
                  width="30"
                  height="30"
                  className="me-2"
                />
              ) : (
                <span className="user-initials me-2">
                  {user.name?.[0] || 'U'}
                </span>
              )}
              <span>{user.name}</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
