import { Link, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { checkUser, getName, logoutUser } from "../../Common/Services/AuthService";
import { useState, useEffect } from "react";
import "./Header.css";


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
    //generate pretty graphics for logo of navbar, in the future
    const navigate = useNavigate();

    const doLogout = () => {
        logoutUser();
        // refresh after logout so header updates
        navigate("/");
        navigate(0);
    }
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">
                    {checkUser() ?(
                        <Link className="path" to={`/${firstName}/home`}>Kumain</Link>
                    ) : (
                        <Link className="path" to="/">Kumain</Link>
                    )}

                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav class="me-auto">
                        <Nav.Link href="#my_cookbook">
                            <Link className="path" to="/mycookbook">My Cookbook</Link>
                        </Nav.Link>
                        <Nav.Link href="#Recipes">
                            <Link className="path" to="/recipes">Recipes</Link>
                        </Nav.Link>
                        <Nav.Link className="path" href="#Tutorials">Tutorials</Nav.Link>
                        {!checkUser() ? (
                            <div>
                                <Nav.Link href="#LogIn"><Link className="path" to="/login">Log In</Link></Nav.Link>
                                <Nav.Link href="#Register"><Link className="path" to="/register">Register</Link></Nav.Link>
                            </div>
                        ) : (
                            <div>
                                <Nav.Link className="path" href="#logout"><Link onClick={doLogout} className="path" to="/">Log Out</Link></Nav.Link>
                            </div>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;