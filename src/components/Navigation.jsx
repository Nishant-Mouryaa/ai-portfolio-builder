import React from 'react';
import { Navbar, Container, Nav, Image } from 'react-bootstrap';
import { usePortfolio } from '../context/PortfolioContext';
import './Navigation.css';

function Navigation() {
  const { state } = usePortfolio();
  const { user } = state;

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="custom-nav">
      <Container fluid>
        <Navbar.Brand href="#home" className="brand-text">
          AI Portfolio Builder
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-content" />
        <Navbar.Collapse id="navbar-content" className="justify-content-end">
          <Nav>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            {/* Example user profile thumbnail or avatar */}
            <Nav.Link href="#profile" className="d-flex align-items-center">
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
