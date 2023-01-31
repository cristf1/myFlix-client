import PropTypes from "prop-types";

export const MovieCard = ({ movieData, onMovieClick }) => {
    return (
        <div
            onClick={() => {
                onMovieClick(movieData);
            }}>
            {movieData.title}
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

