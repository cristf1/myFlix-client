import React from 'react'

function UserInfo({ email, name, birthday }) {

    return (
        <>
            <p> User: {name}</p>
            <p> Email: {email}</p>
            <p> Birthday: {birthday} </p>
        </>
    )
}
export default UserInfo