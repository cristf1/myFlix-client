import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
<<<<<<< Updated upstream
=======
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
>>>>>>> Stashed changes


export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [selectedMovie, setSelectedMovie] = useState(null);
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
                        director: movieAPIData.Director.Name
                    }
                });
                setMovies(moviesFromApi);
            });
    }, [token]);
    /* .then((movieData) => {
         console.log("movies from api:", movieData);
         //update state with data value:
         const moviesFromApi = movieData.map((movieAPIData) => {
             return {
                 title: movieAPIData.Title,
                 description: movieAPIData.Description,
                 genre: movieAPIData.Genre.Name,
                 director: movieAPIData.Director.Name
             }
         });

         setMovies(moviesFromApi);
     });*/
    // }, []);





    if (!user) {
        return (
            <>
                <LoginView
                    onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                    }} />
                or
                < SignupView />
            </>
        );
    }





    //movie list and setting click of Movie Card 


    if (selectedMovie) {
        return (
            <MovieView movieData={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    };

    if (movies.length === 0) {
        return <div> The list is empty!</div>;
    };

    return (
        <div>
            {movies.map((movieData) => (
                <MovieCard
                    movieData={movieData}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie)
                    }} />
            ))}
            <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
        </div>

    );

};
