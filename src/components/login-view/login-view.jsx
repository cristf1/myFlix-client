
import { React, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import './login-view.scss';

export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    const handleSubmit = (event) => {
        // this prevents the default behavior of the form which is to reload the entire page
        event.preventDefault();

        //"Username" and "Password" matches the fields in the DB, had trouble when used "access/secret" following the instructions in 3.5 lesson
        const data = {
            Username: username,
            Password: password,
        };




        fetch("https://cristine-myflix.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
            /* }).then((response) => {
                 if (response.ok) {
                     onLoggedIn(username);
                 } else {
                     alert("Login failed");
                 }
             });*/

        })
            .then((response) => response.json())
            .then((data) => {
                //console.log(response);

                console.log("Login response:", data);
                if (data.user, data.token) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    localStorage.setItem("token", data.token);
                    onLoggedIn(data.user, data.token);
                } else {
                    alert("No such user");
                }
            })
            .catch((e) => {
                alert("Something went wrong");
            })

    };
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="loginFormUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required />
            </Form.Group>
            <Form.Group controlId="loginFormPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    type="passowrd"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required />
            </Form.Group>
            <Button className='mb-5' variant="primary" type="submit">Submit</Button>
        </Form>
    );
}
