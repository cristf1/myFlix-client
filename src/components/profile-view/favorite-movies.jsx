import React from 'react';
import { Link } from 'react-router-dom';

function FavoriteMovies({ favoriteMovies }) {
    return (
        <div>
            <h4>Favorite Movies</h4>
            {favoriteMovies.map((movies) => {
                return (
                    <div key={movies._id}>
                        <img src={movies.ImagePath} />
                        <Link to={'/movies/${movies._id}'}>
                            <h4>{movies.Title}</h4>
                        </Link>
                        <button variant='secondary' onClick={() => removeFav(movies._id)}>
                            {' '}
                            Remove from List
                        </button>
                    </div>
                );
            })}
        </div>
    );
}

export default FavoriteMovies;