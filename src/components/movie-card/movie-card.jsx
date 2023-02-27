import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'

export const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movies/${(movie.id)}`}>
      <Card className={'h-100'} variant='link'>
        <Card.Img variant='top' src={movie.image} />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.director}</Card.Text>
          <Card.Text>{movie.id}</Card.Text>
        </Card.Body>
      </Card>
    </Link >
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.number.isRequired,
    }),
  }).isRequired,

  onMovieClick: PropTypes.func.isRequired
};

