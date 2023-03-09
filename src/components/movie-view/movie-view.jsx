import { useParams } from 'react-router';
import { Link, useNavigate } from 'react-router-dom';
import './movie-view.scss';
import { Button } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'


export const MovieView = ({ movies }) => {
  const navigate = useNavigate();
  const movieId = useParams();
  console.log(movieId)

  const strMovieId = JSON.parse(JSON.stringify(movieId))
  console.log(strMovieId.movieId)

  const movie = movies.find((m) => m.id === (strMovieId.movieId))
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
              onClick={() => navigate(-1)}
              style={{ cursor: 'pointer' }}>
              Back</Button>
          </Link>
        </div>
      </div>
    </Row >
  );
}