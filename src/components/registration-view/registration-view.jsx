import React, { useState } from 'react';
import PropTypes from 'prop-types';

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
        <form>
            <label>
                Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="text" value={username} onChange={e => setPassword(e.target.value)} />
            </label>
            <label>
                Email:
                <input type="text" value={username} onChange={e => setEmail(e.target.value)} />
            </label>
            <label>
                Birthday:
                <input type="text" value={username} onChange={e => setBirthday(e.target.value)} />
            </label>
            <button type='submit' onClick={handleSubmit}>Submit</button>

        </form>
    )
}