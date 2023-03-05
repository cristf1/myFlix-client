import React from 'react';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import FavoriteMovies from './favorite-movies';


function UpdateUser({ user }) {
    const storedToken = localStorage.getItem('token');
    const [username, setUsername] = useState(user.Username);
    const [password, setPassword] = useState(user.Password);
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.Birthday);


    const [token] = useState(storedToken ? storedToken : null);



    const handleSubmit = (event) => {
        event.preventDefault();


        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday,
        };

        console.log(data);

        fetch(
            `https://cristine-myflix.herokuapp.com/users/${user.Username}`,
            {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        )
            .then((response) => {
                console.log(user);
                console.log(data)
                console.log(email)
                if (response.ok) {
                    alert('You will be logged out.');
                    localStorage.clear();
                    window.location.reload();


                } else {
                    alert('Something went wrong');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleDelete = () => {
        fetch(
            `https://cristine-myflix.herokuapp.com/users/${user.Username}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            }
        )
            .then((response) => {
                if (response.ok) {
                    alert("Account successfully deleted");
                    localStorage.clear();
                    window.location.reload();
                } else {
                    alert("Something went wrong");
                }
            });
    };


    return (
        <>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                        className="m-2 block px-2"
                        type='text'
                        name='Username'
                        defaultValue={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password: </Form.Label>
                    <Form.Control
                        className="m-2 block px-2"
                        type='password'
                        name='Password'
                        defaultValue={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        className="m-2 block px-2"
                        type='email'
                        name='email'
                        defaultValue={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                        className="m-2 block px-2"
                        type='date'
                        defaultValue={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                    />
                </Form.Group>
                <Button variant='primary' type='submit' className="m-2 block px-2">Save Changes</Button>
            </Form>
            <Button onClick={() => handleDelete(user.Username)} type="submit" variant="danger" className="m-2 block px-2"> Delete Account</Button>
        </>
    );
}
export default UpdateUser