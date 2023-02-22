import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import './profile-view.scss';
import { Button, Span } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import UserInfo from './user-info';
import FavoriteMovies from './favorite-movies';
import UpdateUser from './update-user';

export const ProfileView = ({ movies, onBackClick }) => {
    //const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem('token');
    const [token] = useState(storedToken ? storedToken : null);
    const [user, setUser] = useState('');


    let favoriteMovies = movies
        ? movies.filter((m) => user.FavoriteMovies.includes(m._id))
        : [];

    useEffect(() => {
        if (!token) {
            return;
        }
        fetch('https://cristine-myflix.herokuapp.com/users/${user.Username}', {
            method: 'GET',
            headers: { Authorization: 'Bearer ${token}' },
        })
            .then((response) => response.json())
            .then((userData) => {
                console.log(userData);
                const usersFromApi = userData.map((userAPIData) => {
                    return {
                        username: userAPIData.Username,
                        birthday: userAPIData.Birthday,
                        email: userAPIData.Email,
                        id: userAPIData._id,
                    };
                });
                setUser(usersFromApi);
            });
    }, [token]);




    return (
        <Row className='justify-content-md-center'>
            <div>
                <div>
                    <span>Profile Information</span>
                </div>
                <div>
                    <UserInfo name={user.Username} email={user.Email} birthday={user.Birthday} />
                    <FavoriteMovies favoriteMovies={favoriteMovies} />


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
            </div>
        </Row >
    );
};