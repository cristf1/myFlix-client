import React from 'react';
import { Navbar, Container, Nav, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const NavigationBar = ({ user, onLoggedOut }) => {
    return (
        <Navbar bg='light' expand='lg'>
            <Container>
                <Navbar.Brand as={Link} to='/'>
                    Find Your Movie
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='me-auto'>
                        {!user && (
                            <>
                                <Nav.Link as={Link} to='/login'>
                                    Login
                                </Nav.Link>
                                <Nav.Link as={Link} to='/signup'>
                                    Signup
                                </Nav.Link>
                            </>
                        )}
                        {user && (
                            <>
                                <Nav.Link as={Link} to='/'>
                                    Home
                                </Nav.Link>
                                <Nav.Link as={Link} to={`/users/${user.Username}`}>
                                    Profile
                                </Nav.Link>
                                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>

                            </>
                        )}
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
};