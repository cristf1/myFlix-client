import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import './movie-view.scss';
import { Button } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'


export const MovieView = ({ movies, onBackClick }) => {
  const movieId = useParams();
  const movie1 = movies[1];

  console.log(movieId)
  console.log(movies)
  console.log(typeof movieId)
  console.log(movie1.id)
  console.log(typeof movie1.id)

  const strMovieId = JSON.parse(JSON.stringify(movieId))
  console.log(strMovieId.movieId)

  const movie = movies.find((m) => m.id === (strMovieId.movieId))
  //((m) => m.id === JSON.stringify(movieId));
  //const favoriteMovies = movies.filter((m) =>user.FavoriteMovies.includes(m.id)

  console.log(movie)

  return (
    <Row className='justify-content-md-center'>
      <div>
        <div>
          <img src={movie.image} />
        </div>
        <div>
          <span>Title: </span>
          <span>{movie.title}</span>
        </div>
        <div>
          <span>Director: </span>
          <span>{movie.director}</span>
        </div>
        <div>
          <span>Genre: </span>
          <span>{movie.genre}</span>
        </div>
        <div>
          <span>Description: </span>
          <span>{movie.description}</span>
        </div>
        <div>
          <Link to={'/'}>
            <Button
              onClick={onBackClick}
              //className='back-button'
              style={{ cursor: 'pointer' }}>
              Back</Button>
          </Link>
        </div>
      </div>
    </Row >
  );
}