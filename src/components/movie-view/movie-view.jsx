import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import './movie-view.scss';
import { Button } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'


export const MovieView = ({ movies, onBackClick }) => {
  const movieId = useParams();
  console.log(movieId)
  console.log(movies)

  const movie = movies.find((m) => m.id === movieId);

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