import React from 'react';
import './Movies.css'
import Movie from './Movie/Movie.js'

const Movies = (props) => {

    let movieList = props.movies;

    return (
        <section className="movies-ctnr">
            {movieList.length > 0 ?
                <>
                    <h2>Bibliothèque de films</h2>
                    {movieList.map((movie, index) => (
                        <Movie movie={movie} key={index} onDelete={props.onDelete} />
                    ))}
                </> : <h2>Il n'y a pas de films à afficher dans votre Bibliothèque</h2>}

        </section>
    )
}

export default Movies;