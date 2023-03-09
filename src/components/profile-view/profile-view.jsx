import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './profile-view.scss';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import UserInfo from './user-info';
//import FavoriteMovies from './favorite-movies';
import UpdateUser from './update-user';
import { MovieCard } from '../movie-card/movie-card';



export const ProfileView = ({ user, token, movies, onBackClick }) => {
    //const storedUser = JSON.parse(localStorage.getItem('user'));
    // const storedToken = localStorage.getItem('token');
    //const [token] = useState(storedToken ? storedToken : null);

    console.log(user);
    console.log(token);

    let favoriteMovies = movies.filter((m) =>
        user.FavoriteMovies.includes(m.id)
    );
    // console.log(movies)
    //console.log(user.FavoriteMovies)
    // console.log(favoriteMovies);



    useEffect(() => {
        if (!token) {
            return;
        }
        fetch('https://cristine-myflix.herokuapp.com/users/${user.Username}', {
            method: 'PUT',
            headers: { Authorization: 'Bearer ${storedToken}' },
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
                        favoriteMovies: userAPIData._FavoriteMovies,
                    };
                });
                setUser(usersFromApi);
            });
    }, [token]);






    return (

        <Container>
            <Row >
                <Col>
                    <h5>Profile Information:</h5>
                    <UserInfo name={user.Username} email={user.Email} birthday={user.Birthday} />

                </Col>

            </Row>
            <Row>

                <h5>Favorite Movies:</h5>
                {favoriteMovies.length === 0 ? (
                    <Col> The list is empty!</Col>
                ) : (
                    favoriteMovies.map((favoriteMovie) => (
                        <Col className='mb=4 align-items-start' key={favoriteMovie.id} md={3}>
                            <MovieCard movie={favoriteMovie} user={user} token={token} />
                        </Col>
                    )
                    )
                )
                }
            </Row>
            <Row>
                <Col>
                    <h5> Edit Account </h5>
                    <UpdateUser user={user} token={token} />
                </Col>




                <div>
                    <Link to={'/'}>
                        <Button
                            className="m-2 block px-2"
                            onClick={onBackClick}
                            style={{ cursor: 'pointer' }}>
                            Back</Button>
                    </Link>
                </div>

            </Row >
        </Container>
    );
};