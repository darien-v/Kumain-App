import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">
                    <Link to="/">Kumain</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav class="me-auto">
                        <Nav.Link href="#my_cookbook">
                            <Link to="/mycookbook">My Cookbook</Link>
                        </Nav.Link>
                        <Nav.Link href="#Recipes">
                            <Link to="/recipes">Recipes</Link>
                        </Nav.Link>
                        <Nav.Link href="#Tutorials">Tutorials</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;