import React from 'react';
import './Movies.css'
import Movie from '../Movie/Movie.js'

const Movies = (props) => {
    
    let movieList = props.movies;

    return (
        <section>
            <h2>Bibliothèque de films</h2>
            {movieList.map((movie, index) => (
                <Movie movie={movie} key={index}/>
            ))}
        </section>
    )
}

export default Movies;