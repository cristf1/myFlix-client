import React from 'react'


function deleteUser({ user, token }) {

    console.log(user)
    console.log(token)

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
}

export default deleteUser