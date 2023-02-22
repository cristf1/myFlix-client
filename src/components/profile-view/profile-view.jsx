import React from 'react';
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import './profile-view.scss';
import { Button, Span } from "react-bootstrap"
import Row from 'react-bootstrap/Row'

export const ProfileView = ({ user, movies, onBackClick }) => {
    //const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [token] = useState(storedToken ? storedToken : null);


    useEffect(() => {
        if (!token) {
            return;
        }
        fetch("https://cristine-myflix.herokuapp.com/users/${user.Username}", {
            method: "GET",
            headers: { Authorization: 'Bearer ${token}' },
        })
            .then((response => response.json()))
            .then((userData) => {
                console.log(userData);
                const usersFromApi = userData.map((userAPIData) => {
                    return {
                        username: userAPIData.Username,
                        birthday: userAPIData.Birthday,
                        email: userAPIData.Email,
                        id: userAPIData._id,
                    }
                });
                setUsers(usersFromApi);
            });
    }, [token]);




    return (
        <Row className="justify-content-md-center">
            console.log(user);
            <div>
                <div>
                    <Span>Profile Information</Span>
                </div>
                <div>
                    <span>Username:</span>
                    <span >{user.username} </span>
                </div>
                <div>
                    <span>Birthday: </span>
                    <span>{user.birthday}</span>
                </div>
                <div>
                    <span>Email: </span>
                    <span>{user.email}</span>
                </div>
                <div>
                    <Link to={'/users/:userId'}>
                        <Button
                            onClick={onBackClick}
                            style={{ cursor: "pointer" }}>
                            Back</Button>
                    </Link>
                </div>
                <div>
                    <Link to={'/'}>
                        <Button
                            onClick={onBackClick}
                            style={{ cursor: "pointer" }}>
                            Back</Button>
                    </Link>
                </div>
            </div>
        </Row >
    );
}