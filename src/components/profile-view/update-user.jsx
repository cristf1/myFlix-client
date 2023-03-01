import React from 'react';
import { useState } from 'react';


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
        console.log(data)
        fetch(
            `https://cristine-myflix.herokuapp.com/users/${user.username}`,
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
                if (response.ok) {
                    alert('Changes saved');
                    setUsername(username);
                } else {
                    alert('Something went wrong');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };




    return (

        <form onSubmit={(e) => handleSubmit(e)}>
            <label>
                Username:
                <input
                    class="m-2 block px-2"
                    type='text'
                    name='Username'
                    defaultValue={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </label>
            <label>
                Password:
                <input
                    type='password'
                    name='Password'
                    defaultValue={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <label>
                Email:
                <input
                    type='email'
                    name='email'
                    defaultValue={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            <label>
                Birthday:
                <input
                    type='date'
                    defaultValue={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                />
            </label>
            <button variant='primary' type='submit'>Submit</button>
        </form>
    );
}
export default UpdateUser