import React from 'react';
import './Movie.css'
import { Link } from 'react-router-dom';

const Movie = (props) => {
    let movie = props.movie;
    return (
        <div className='movieCard'>
            <Link to={`/movie/${movie.id}`}>
                <img className='img-responsive' src={movie.poster} alt='Spider-Man Far From Home' />
            </Link>
            <div className='text-ctnr'>
                <h2 className='title'>{movie.title}</h2>
                <p className='date'>{movie.release_date}</p>
                <p className='text'>{movie.description}</p>

                <div className='btn-ctnr'>
                    <Link to={`/movie/edit/${movie.id}`} className='modify'>Modifier</Link>
                    <button className="delete" type="submit" onClick={(e) => props.onDelete(e, movie)}>Supprimer</button>
                </div>
            </div>
        </div>
    )
}


export default Movie;