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
          <h3>{movie.title}</h3>
        </div>
        <div>
          <h6>Director:</h6>
          <p>{movie.director}</p>
        </div>

        <div>
          <h6>Genre: </h6>
          <p>{movie.genre}</p>
        </div>

        <div>
          <h6>Description: </h6>
          <p>{movie.description}</p>
        </div>
        <div>
          <Link to={'/'}>
            <Button
              onClick={() => navigate(-1)}
              style={{ cursor: 'pointer' }}
              variant='secondary'>
              Back
            </Button>
          </Link>
        </div>
      </div>
    </Row >
  );
}