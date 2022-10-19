import React from 'react';

export class MovieView extends ReactComponent {

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