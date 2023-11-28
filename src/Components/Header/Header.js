import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { checkUser, getName } from "../../Common/Services/AuthService";
import { useState, useEffect } from "react";


function Header() {
    const [firstName, setFirstName] = useState('');

    useEffect(() => {
      const fetchData = async () => {
        try {
          const name = await getName();
          setFirstName(name || ''); // Update state with the retrieved name
        } catch (error) {
          console.error('Error fetching name:', error);
        }
      };
  
      fetchData();
    }, []);
    const mystyle = {
        textDecoration: "none"
    };
    //generate pretty graphics for logo of navbar, in the future
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">
                    {checkUser() ?(
                        <Link style={mystyle} to={`/${firstName}/home`}>Kumain</Link>
                    ) : (
                        <Link style={mystyle} to="/">Kumain</Link>
                    )}

                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav class="me-auto">
                        <Nav.Link href="#my_cookbook">
                            <Link style={mystyle} to="/mycookbook">My Cookbook</Link>
                        </Nav.Link>
                        <Nav.Link href="#Recipes">
                            <Link style={mystyle} to="/recipes">Recipes</Link>
                        </Nav.Link>
                        <Nav.Link style={mystyle} href="#Tutorials">Tutorials</Nav.Link>
                        {!checkUser() ? (
                            <div>
                                <Nav.Link href="#LogIn"><Link style={mystyle} to="/login">Log In</Link></Nav.Link>
                                <Nav.Link href="#Register"><Link style={mystyle} to="/register">Register</Link></Nav.Link>
                            </div>
                        ) : (
                            <div>
                                <Nav.Link style={mystyle} href="#logout">Log Out</Nav.Link>
                            </div>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;