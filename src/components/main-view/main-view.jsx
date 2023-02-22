import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";

import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(storedUser ? storedUser : null);
    //const [selectedMovie, setSelectedMovie] = useState(null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    //fetch data from API and update default state with movieData
    useEffect(() => {
        if (!token) {
            return;
        }

        fetch("https://cristine-myflix.herokuapp.com/movies", {
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
                        //userId: movieAPIData._
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
                }} />
            <Row className="justify-content-md-center">
                <Routes>
                    <Route
                        path="/signup"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
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
                        path="/login"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
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
                        path="/movies/:movieId"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col> The list is empty!</Col>
                                ) : (
                                    <Col md={8} style={{ border: "1px solid black" }} >
                                        <MovieView movies={movies} />
                                    </Col>
                                )
                                }

                            </>
                        }
                    >
                    </Route>
                    <Route
                        path="/profile"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col> The list is empty!</Col>
                                ) : (
                                    <Col md={8} style={{ border: "1px solid black" }} >
                                        <ProfileView user={user} movies={movies} />
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
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col> The list is empty!</Col>
                                ) : (
                                    <>
                                        {movies.map((movie) => (
                                            <Col className='mb=4' key={movie.id} md={3}>
                                                <MovieCard movie={movie} />

                                            </Col>
                                        )
                                        )}
                                        <Button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</Button>
                                    </>
                                )
                                }
                            </>
                        }
                    />


                </Routes>
            </Row>
        </BrowserRouter >

    )

};
