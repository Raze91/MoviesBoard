import React from 'react';
import './Movies.css'
import Movie from '../Movie/Movie.js'

const Movies = (props) => {
    
    let movieList = props.movies;

    return (
        <section>
            <h1>Bibliothèque de films</h1>
            {movieList.map((movie, index) => (
                <Movie movie={movie} key={index}/>
            ))}
        </section>
    )
}

export default Movies;