import React from 'react';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';


function UpdateUser({ user }) {
    const storedToken = localStorage.getItem('token');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

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
                if (response.ok) {
                    alert('Changes saved');
                    window.location.reload();
                    setUsername(username);
                    console.log('user:', user)
                } else {
                    alert('Something went wrong');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const handleDelete = () => {

        fetch('https://cristine-myflix.herokuapp.com/users/${user.Username}', {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }).then((response) => {
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
                        defaultValue={user.Username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password: </Form.Label>
                    <Form.Control
                        className="m-2 block px-2"
                        type='password'
                        name='Password'
                        defaultValue={user.Password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        className="m-2 block px-2"
                        type='email'
                        name='email'
                        defaultValue={user.Email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                        className="m-2 block px-2"
                        type='date'
                        defaultValue={user.Birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                    />
                </Form.Group>
                <Button variant='primary' type='submit' className="m-2 block px-2">Save Changes</Button>
            </Form>
            <Button onClick={() => handleDelete(user._id)} type="submit" variant="danger" className="m-2 block px-2"> Delete Account</Button>
        </>
    );
}
export default UpdateUser