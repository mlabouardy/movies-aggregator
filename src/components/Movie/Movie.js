import React from 'react';
import './Movie.css';

class Movie extends React.Component {

    render() {
        return (
            <>
                <div className="movie mt-3 mb-3">
                    <img src={'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/' + this.props.movie.poster_path} className="poster" />
                    <div className="details ml-5">
                        <span className="title">{this.props.movie.original_title}</span>
                        <span className="badge badge-warning ml-2">{this.props.movie.release_date}</span>
                        <p>{this.props.movie.overview}</p>
                    </div>
                </div>
            </>
        )
    }
}

export default Movie;