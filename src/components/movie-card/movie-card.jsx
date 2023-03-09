import useState from 'react'
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'


export const MovieCard = ({ movie, user, token }) => {
  //const [favorite, setFavorite]=useState(true);
  console.log(movie);
  console.log(user);

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
      <Card variant='link'>
        <Link to={`/movies/${(movie.id)}`}>
          <Card.Img variant='top' src={movie.image} />
          <Card.Body>
            <Card.Title className='text-center'>{movie.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted text-center" >{movie.director}</Card.Subtitle>
          </Card.Body>
        </Link >
        <Button onClick={() => handleFavorite(movie.id)} variant='light' type='submit' shape='rounded-pill' >Favorite</Button>
        <Button onClick={() => handleUnfavorite(movie.id)} variant='danger' type='submit' shape='rounded-pill' >Unfavorite</Button>



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

