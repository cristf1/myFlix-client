import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [
        {
          _id: 1,
          Title: 'Inception',
          Description: 'Dom Cobb (Leonardo DiCaprio) is a thief with the rare ability to enter peoples dreams and steal their secrets from their subconscious. His skill has made him a hot commodity in the world of corporate espionage but has also cost him everything he loves. Cobb gets a chance at redemption when he is offered a seemingly impossible task: Plant an idea in someones mind. If he succeeds, it will be the perfect crime, but a dangerous enemy anticipates Cobbs every move.',
          ImagePath: 'https://www.previewsworld.com/SiteImage/MainImage/STL206028.jpg',
        },
        {
          _id: 2,
          Title: 'The Shawshank Redemption',
          Description: 'desc2...',
          ImagePath: '...'
        },
        {
          _id: 3,
          Title: 'Gladiator',
          Description: 'desc3...',
          ImagePath: '...'
        }
      ],
      selectedMovie: null
    }
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }


  render() {
    const { movies, selectedMovie } = this.state;

    if (movies.length === 0)
      return <div className='main-view'>The list is empty!</div>;
    else {
      return (
        <div className='main-view'>
          {selectedMovie ? (
            <MovieView
              movieData={selectedMovie}

              onBackClick={(newSelectedMovie) => {
                this.setSelectedMovie(newSelectedMovie);
              }}
            />
          ) : (
            movies.map((movie) => (
              <MovieCard
                key={movie._id}
                movieData={movie}
                onMovieClick={(newSelectedMovie) => {
                  this.setSelectedMovie(movie);
                }}
              />
            ))
          )}
        </div>
      );
    }
  }
}