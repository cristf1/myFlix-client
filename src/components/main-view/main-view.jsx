import React from 'react';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
{/*import images from '../images';*/ }


export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [
        {/*} {
          _id: 1,
          Title: 'Inception',
          Description: 'Dom Cobb (Leonardo DiCaprio) is a thief with the rare ability to enter peoples dreams and steal their secrets from their subconscious. His skill has made him a hot commodity in the world of corporate espionage but has also cost him everything he loves. Cobb gets a chance at redemption when he is offered a seemingly impossible task: Plant an idea in someones mind. If he succeeds, it will be the perfect crime, but a dangerous enemy anticipates Cobbs every move.',
          ImagePath: './images/Inception.jpeg',
        },
        {
          _id: 2,
          Title: "Spider-Man: No Way Home",
          Description: "With Spider-Mans identity now revealed, our friendly neighborhood web-slinger is unmasked and no longer able to separate his normal life as Peter Parker from the high stakes of being a superhero. When Peter asks for help from Doctor Strange, the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man",
          ImagePath: './images/SpiderMan No Way Home.jpg',
        },
        {
          _id: 3,
          Title: "Harry Potter and the Chamber of Secrets",
          Description: "The second installment of boy wizard Harry Potter adventures at Hogwarts School of Witchcraft and Wizardry, based on the novel by JK Rowling. A mysterious elf tells Harry to expect trouble during his second year at Hogwarts, but nothing can prepare him for trees that fight back, flying cars, spiders that talk and deadly warnings written in blood on the walls of the school.",
          ImagePath: './images/Harry Potter 2',
        }*/}
      ],
      selectedMovie: null
    }
  }

  componentDidMount() {
    axios.get('https://cristine-myflix.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
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