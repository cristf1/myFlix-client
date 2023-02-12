import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


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
    ;
    return (
        <Row className="justify-content-md-center">
            {!user ? (
                <Col md={5}>
                    <LoginView
                        onLoggedIn={(user, token) => {
                            setUser(user);
                            setToken(token);
                        }} />
                    or
                    < SignupView />
                </Col>
            ) : selectedMovie ? (
                <Col md={8} style={{ border: "1px solid black" }} >
                    <MovieView
                        movieData={selectedMovie}
                        onBackClick={() => setSelectedMovie(null)}
                    />
                </Col>
            ) : movies.length === 0 ? (
                <div> The list is empty!</div>
            ) :
                (
                    <>
                        {movies.map((movieData) => (
                            <Col key={movieData.id} md={3} className='mb-5'>
                                <MovieCard
                                    movieData={movieData}
                                    onMovieClick={(newSelectedMovie) => {
                                        setSelectedMovie(newSelectedMovie)
                                    }} />
                            </Col>
                        ))}
                        <Button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</Button>
                    </>
                )}
        </Row>
    )


/*

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
*/