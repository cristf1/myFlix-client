import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { ProfileView } from '../profile-view/profile-view';

import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = localStorage.getItem('token');
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [searchedMovies, setSearchedMovies] = useState('');


    //fetch data from API and update default state with movieData

    useEffect(() => {
        if (!token) {
            return;
        }

        fetch('https://cristine-myflix.herokuapp.com/movies', {
            headers: { Authorization: 'Bearer ${token}' },
        })
            .then((response => response.json()))
            .then((movieData) => {
                console.log(movieData);
                const moviesFromApi = movieData.map((movieAPIData) => {
                    return {
                        title: movieAPIData.Title,
                        description: movieAPIData.Description,
                        genre: movieAPIData.Genre.Name,
                        director: movieAPIData.Director.Name,
                        id: movieAPIData._id,
                        //image: movieAPIData.Image,
                    }
                });
                setMovies(moviesFromApi);
            });
    }, [token]);


    return (

        <BrowserRouter>
            <NavigationBar
                user={user}

                onLoggedOut={() => {
                    setUser(null);
                }}
            />
            <Container>
                <Row className='xs={1} md={2} justify-content-md-center g-4'>
                    <Routes>
                        <Route
                            path='/signup'
                            element={
                                <>
                                    {user ? (
                                        <Navigate to='/' />
                                    ) : (
                                        <Col md={5}>
                                            <SignupView />
                                        </Col>
                                    )}
                                </>
                            }
                        >
                        </Route>
                        <Route
                            path='/login'
                            element={
                                <>
                                    {user ? (
                                        <Navigate to='/' />
                                    ) : (
                                        <Col md={5}>
                                            <LoginView onLoggedIn={(user, token) => {
                                                setUser(user);
                                                setToken(token);
                                            }} />
                                        </Col>
                                    )}
                                </>
                            }
                        >
                        </Route>
                        <Route
                            path='/movies/:movieId'
                            element={
                                <>
                                    {!user ? (
                                        <Navigate to='/login' replace />
                                    ) : movies.length === 0 ? (
                                        <Col> The list is empty!</Col>
                                    ) : (
                                        <Col md={8} >
                                            <MovieView movies={movies} user={user} />
                                        </Col>
                                    )
                                    }

                                </>
                            }
                        >
                        </Route>
                        <Route
                            path='/users/:username'
                            element={
                                <>
                                    {!user ? (
                                        <Navigate to='/login' replace />
                                    ) : movies.length === 0 ? (
                                        <Col> The list is empty!</Col>
                                    ) : (
                                        <Col >
                                            <ProfileView user={user} movies={movies} token={token} />
                                        </Col>
                                    )
                                    }
                                </>
                            }
                        >
                        </Route>
                        <Route
                            path='/'
                            element={
                                <>
                                    <Row className="justify-content-md-center m-0">
                                        <Col sm={10} md={8} lg={4} className="mb-3 mb-md-5" />
                                    </Row>
                                    <Row className="justify-content-md-center m-0 p-9">
                                        <Col md={8} lg={4} className="mb-3 mb-md-5">
                                            <Form>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Search Movie Title"
                                                    value={searchedMovies}
                                                    onChange={e => setSearchedMovies(e.target.value)}
                                                    className="bg-light shadow-sm"
                                                />
                                            </Form>

                                        </Col>
                                    </Row>
                                    <Row>

                                        {!user ? (
                                            <Navigate to='/login' replace />
                                        ) : movies.length === 0 ? (
                                            <Col> The list is empty!</Col>
                                        ) : (

                                            (movies.filter((movie) => {
                                                if (searchedMovies == "") {
                                                    return movie
                                                } else if (movie.title.toLowerCase().includes(searchedMovies.toLowerCase())) {
                                                    return movie
                                                }
                                            })
                                            ).map((movie) =>
                                                <Col md={4} lg={3} key={movie._id} className="mb-5">
                                                    <MovieCard movie={movie} user={user} token={token} />
                                                </Col>
                                            ))}
                                    </Row>


                                </>
                            }
                        />

                    </Routes>
                </Row>
            </Container>
        </BrowserRouter >

    )

};