import useState from 'react'
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'


export const MovieCard = ({ movie, user, token }) => {
  //const [favorite, setFavorite]=useState(true);
  console.log(movie);
  const handleFavorite = () => {
    console.log(user);
    fetch(
      `https://cristine-myflix.herokuapp.com/users/${user.Username}/movies/${movie.id}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          alert(movie.title + ' has been successfully added to Favorites List!');
          window.location.reload();
          console.log(user.FavoriteMovies)
        } else {
          alert("Something went wrong");
        }
      });
  };
  const handleUnfavorite = () => {
    console.log(user);
    fetch(
      `https://cristine-myflix.herokuapp.com/users/${user.Username}/movies/${movie.id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          alert(movie.title + ' has been successfully deleted from Favorites List!');
          window.location.reload();
          console.log(user.FavoriteMovies)
        } else {
          alert("Something went wrong");
        }
      });
  };


  return (
    <div>
      <Card className={'h-100'} variant='link'>
        <Link to={`/movies/${(movie.id)}`}>
          <Card.Img variant='top' src={movie.image} />
          <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>{movie.director}</Card.Text>
          </Card.Body>
        </Link >
        <Button onClick={() => handleFavorite(movie.id)} variant='light' type='submit' >Favorite</Button>
        <Button onClick={() => handleUnfavorite(movie.id)} variant='danger' type='submit' >Unfavorite</Button>



      </Card>
    </div>


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

