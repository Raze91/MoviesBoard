import React from 'react';
import './Movie.css'

const Movie = (props) => {
    let movie = props.movie;
    return (
        <div className='movieCard'>
            <img className='img-responsive' src={movie.poster} alt='Spider-Man Far From Home' />
            <div>
                <h2 className='title'>{movie.title}</h2>
                <p className='date'>{movie.release_date}</p>
                <p className='text'>{movie.description}</p>

                <div className='btn-ctnr'>
                    <a className='modify'>Modifier</a>
                    <a className='delete'>Supprimer</a>
                </div>
            </div>
        </div>
    )
}


export default Movie;