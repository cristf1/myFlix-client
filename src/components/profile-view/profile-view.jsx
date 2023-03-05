import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import './profile-view.scss';
import { Button } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap/Row';
import UserInfo from './user-info';
//import FavoriteMovies from './favorite-movies';
import UpdateUser from './update-user';



export const ProfileView = ({ user, movies, onBackClick }) => {
    //const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = localStorage.getItem('token');
    const [token] = useState(storedToken ? storedToken : null);

    let favoriteMovies = movies.filter(m => user.FavoriteMovies.includes(m._id));
    console.log(favoriteMovies);



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


        <Row className='justify-content-md-center'>

            <div>
                <div>
                    <h2>Profile Information:</h2>

                </div>
                <div>
                    <UserInfo name={user.Username} email={user.Email} birthday={user.Birthday} />

                </div>
                <div>
                    {favoriteMovies.length === 0 ? (
                        <Col> The list is empty!</Col>
                    ) : (
                        favoriteMovies.map((movie) => (
                            <Col className='mb=4' key={movie.id} md={3}>
                                <MovieCard favoriteMovies={movie} />
                            </Col>
                        )
                        )
                    )
                    }
                </div>
                <div>
                    <h5> Edit Account </h5>
                    <UpdateUser user={user} token={token} />
                </div>




                <div>
                    <Link to={'/'}>
                        <Button
                            className="m-2 block px-2"
                            onClick={onBackClick}
                            style={{ cursor: 'pointer' }}>
                            Back</Button>
                    </Link>
                </div>
            </div >
        </Row >

    );
};