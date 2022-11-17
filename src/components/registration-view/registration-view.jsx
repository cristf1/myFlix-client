import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email, birthday);
        props.onRegistration(username);
    };

    return (
        <Container>
            <Row>
                <Col>
                    <CardGroup>
                        <Card>
                            <Card.Body>
                                <Card.Title> Please Register </Card.Title>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>Username:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={username}
                                            onChange={e => setUsername(e.target.value)}
                                            placeholder='Enter a username' />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Password:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            placeholder='Enter a password'
                                            required
                                            minLength='8'
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Email:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            placeholder='Enter an Email'
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Birthday:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={birthday}
                                            onChange={e => setBirthday(e.target.value)}
                                            placeholder='Enter your Birthday'
                                        />
                                    </Form.Group>
                                    <Button variant='primary' type='submit' onClick={handleSubmit}>Submit</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
    )
}

RegistrationView.propTypes = {
    user: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
        Birthday: PropTypes.string.isRequired,
    }),
    onRegistration: PropTypes.func.isRequired
};