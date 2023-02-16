import { useParams } from "react-router";
import { Link } from "react-router-dom";
import './movie-view.scss';
import { Button } from "react-bootstrap"
import Row from 'react-bootstrap/Row'


export const MovieView = ({ movieData, onBackClick }) => {
  const { movieId } = useParams();

  console.log(useParams());

  const movie = movieData.find((b) => b.id === movieId)

  console.log("b:", b, "movie:", movie);

  return (
    <Row className="justify-content-md-center">
      <div>
        <div>
          <img src={movieData.image} />
        </div>
        <div>
          <span>Title: </span>
          <span>{movieData.title}</span>
        </div>
        <div>
          <span>Director: </span>
          <span>{movieData.director}</span>
        </div>
        <div>
          <span>Genre: </span>
          <span>{movieData.genre}</span>
        </div>
        <div>
          <span>Description: </span>
          <span>{movieData.description}</span>
        </div>
        <div>
          <Link to={'/'}>
            <Button
              onClick={onBackClick}
              //className="back-button"
              style={{ cursor: "pointer" }}>
              Back</Button>
          </Link>
        </div>
      </div>
    </Row >
  );
}