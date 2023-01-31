import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";


export const MainView = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch("https://cristine-myflix.herokuapp.com/movies")
            .then((response => response.json()))
            .then((movieData) => {
                console.log("movies from api:", movieData)
                //update state with data value:
                const moviesFromApi = movieData.map((movieData) => {
                    return {
                        Title: movieData.Title,
                        //description: movieData.Description,
                    }
                });
                setMovies(moviesFromApi);
            });
    }, []);







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