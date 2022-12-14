import React from 'react';
import PropTypes from 'prop-types';

export class MovieView extends React.Component {

    keypressCallback(event) {
        console.log(event.key);
    }

    componentDidMount() {
        document.addEventListener('keypress', event => {
            console.log(event.key);
        });
    }





    render() {
        const { movieData, onBackClick } = this.props;
        return (
            <div className='movie-view'>
                <div className='movie-poster'>
                    <img src={movieData.ImagePath} />
                </div>
                <div className='movie-title'>
                    <span className='label-title'> Title: </span>
                    <span className='value-title'>{movieData.Title}</span>
                </div>
                <div className='movie-description'>
                    <span className='lable-description'>Description:</span>
                    <span className='value-description'>{movieData.Description}</span>
                </div>
                <button onClick={() => { onBackClick(null); }}>Back</button>
            </div>
        )



    }

}
MovieView.propTypes = {
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
    }).isRequired
}