import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


export class MovieCard extends React.Component {
  render() {
    const { movieData, onMovieClick } = this.props;
    return (
      <Card>
        <Card.Img variant='top' src={movieData.ImagePath} />
        <Card.Body>
          <Card.Title>{movieData.Title}</Card.Title>
          <Card.Text>{movieData.Description}</Card.Text>
          <Button onClick={() => onMovieClick(movieData)} variant='link'>Open</Button>
        </Card.Body>
      </Card>);
    //<div className='movie-card' onClick={() => { onMovieClick(movieData); }} > {movieData.Title} </div>;
  }
}
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