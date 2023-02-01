import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";


export const MainView = () => {
    const [movies, setMovies] = useState([]);
    //fetch data from API and update default state with movieData
    useEffect(() => {
        fetch("https://cristine-myflix.herokuapp.com/movies")
            .then((response => response.json()))
            .then((movieData) => {
                console.log("movies from api:", movieData)
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
            });
    }, []);


    const [user, setUser] = useState(null);
    if (!user) {
        return <LoginView />;
    }



    //movie list and setting click of Movie Card 
    const [selectedMovie, setSelectedMovie] = useState(null);

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
        </div>
    );



};

