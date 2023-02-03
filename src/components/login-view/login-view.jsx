import { React, useState } from "react";


export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    const handleSubmit = (event) => {
        // this prevents the default behavior of the form which is to reload the entire page
        event.preventDefault();

        const data = {
            access: username,
            secret: password
        };

        fetch("https://cristine-myflix.herokuapp.com/movies", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then((response) => response.json()
            .then((userData) => {
                console.log("Login response:", userData);
                if (userData.user) {
                    localStorage.setItem("user", JSON.stringify(userData.user));
                    localStorage.setItem("token", userData.token);
                    onLoggedIn(userData.user, userData.token);
                } else {
                    alert("No such user");
                }
            })
            .catch((e) => {
                alert("Something went wrong");
            }))

        return (
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} required />
                </label>
                <label>
                    Password:
                    <input
                        type="passowrd"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <button type="submit">Submit</button>
            </form>
        );
    }
};