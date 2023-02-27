import React from 'react'


function UpdateUser(handleSubmit, handleUpdate) {

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <label>
                Username:
                <input
                    type='text'
                    name='Username'
                    defaultValue={username}
                    onChange={(e) => handleUpdate(e)}
                />
            </label>
            <label>
                Password:
                <input
                    type='password'
                    name='Password'
                    defaultValue={password}
                    onChange={(e) => handleUpdate(e)}
                />
            </label>
            <label>
                Email:
                <input
                    type='email'
                    name='email'
                    defaultValue={email}
                    onChange={(e) => handleUpdate(e)}
                />
            </label>
            <label>
                Birthday:
                <input
                    type='date'
                    value={birthday}
                    onChange={(e) => handleUpdate(e)}
                />
            </label>
            <button variant='primary' type='submit'>Submit</button>
        </form>
    );
};

export default UpdateUser;