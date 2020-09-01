import React from 'react';
import './Movie.css'
import { Link } from 'react-router-dom';

const Movie = (props) => {
    let movie = props.movie;
    return (
        <section className='movieCard'>
            <Link to='/detailed'>
                <img className='img-responsive' src={movie.poster} alt='Spider-Man Far From Home' />
            </Link>
            <div className='text-ctnr'>
                <h2 className='title'>{movie.title}</h2>
                <p className='date'>{movie.release_date}</p>
                <p className='text'>{movie.description}</p>

                <div className='btn-ctnr'>
                    <Link to='/modify' className='modify'>Modifier</Link>
                    <Link to='/delete' className='delete'>Supprimer</Link>
                </div>
            </div>
        </section>
    )
}


export default Movie;