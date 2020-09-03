import React from 'react';
import './Movies.css'
import Movie from '../Movie/Movie.js'
import Axios from 'axios';

const Movies = (props) => {

    let movieList = props.movies;

    return (
        <section className="movies-ctnr">
            <h2>Bibliothèque de films</h2>
            {movieList.map((movie, index) => (
                <Movie movie={movie} key={index} onDelete={props.onDelete} />
            ))}
        </section>
    )
}

export default Movies;