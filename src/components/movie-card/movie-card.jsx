import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movieData, onMovieClick }) => {
  return (
    <Card className={'h-100'} onClick={() => onMovieClick(movieData)} variant="link">
      <Card.Img variant="top" src={movieData.image} />
      <Card.Body>
        <Card.Title>{movieData.title}</Card.Title>
        <Card.Text>{movieData.author}</Card.Text>
      </Card.Body>
    </Card>
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

