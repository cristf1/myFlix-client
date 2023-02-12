import './movie-view.scss';
import { Button } from "react-bootstrap"
import Row from 'react-bootstrap/Row'

export const MovieView = ({ movieData, onBackClick }) => {
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
          <Button
            onClick={onBackClick}
            //className="back-button"
            style={{ cursor: "pointer" }}>
            Back</Button>
        </div>
      </div>
    </Row>
  );
}