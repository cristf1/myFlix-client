import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Button, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export const MovieCard = ({ movie, user, token }) => {
  const [favorited, setFavorited] = useState();
  console.log(movie);
  console.log(user);
  console.log(user.FavoriteMovies);


  useEffect(() => {
    setFavorited(user.FavoriteMovies.includes(movie.id)), [];
  })
  console.log(favorited);

  const username = user.username;

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
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem('user', JSON.stringify(data));
        window.location.reload();
        //window.open(`/users/${username}`, '_self');
        console.log(data)
      })
      .catch((error) => {
        console.log(error);
      });
  };
  /* .then((response) => {
     if (response.ok) {
       alert(movie.title + ' has been successfully added to Favorites List!');
       //window.location.reload();
       localStorage.setItem('user', JSON.stringify(data));
       window.open(`/users/${username}`, '_self');

       console.log(user.FavoriteMovies)
     } else {
       alert("Something went wrong");
     }
   });
}; */
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
      .then((response) => response.json())
      .then((data) => {
        alert(movie.title + ' has been successfully deleted from Favorites List!');
        localStorage.setItem('user', JSON.stringify(data));
        window.location.reload();
        //window.open(`/users/${username}`, '_self');
        console.log(data)
      })
      //console.log(user.FavoriteMovies)
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <div>
      <Card variant='link' className='justify-content-between shadow p-3 rounded'>
        <Link to={`/movies/${(movie.id)}`}>
          <Card.Img variant='top' src={movie.image} />
          <Card.Body>
            <Card.Title className='text-center'>{movie.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted text-center" >{movie.director}</Card.Subtitle>
          </Card.Body>
        </Link >
        {favorited &&
          <Button onClick={() => handleUnfavorite(movie.id)} variant='outline-danger' type='submit' shape='rounded-pill' >Unfavorite</Button>
        }
        {!favorited &&
          <Button onClick={() => handleFavorite(movie.id)} variant='outline-success' type='submit' shape='rounded-pill' size='small'> + Favorite</Button>

        }


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
