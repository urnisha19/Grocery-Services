import React, { useContext } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.jpg';
import './Header.css';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    return (
        <Container className="header">
            <Navbar bg="***" variant="light" className="py-4">
                <Link to="/home">
                    <img src={logo} alt="" className="logo" />
                </Link>
                <Nav className="ml-auto customNav">
                    <Link to="/home" className="custom-link">Home</Link>
                    <Link to="/ordersPage" className="custom-link">Orders</Link>
                    <Link to="/adminPage" className="custom-link">Admin</Link>
                    <Nav.Link href="#">Deals</Nav.Link>
                    <Nav.Link href="#">{loggedInUser.displayName}</Nav.Link>
                    {
                        loggedInUser.email ?
                            <Button variant="primary" className="customButton" onClick={() => setLoggedInUser({})}>Logout</Button>
                            :
                            <Link to="/login">
                                <Button variant="primary" className="customButton">Login</Button>
                            </Link>
                    }
                </Nav>
            </Navbar>
        </Container>
    );
};

export default Header;