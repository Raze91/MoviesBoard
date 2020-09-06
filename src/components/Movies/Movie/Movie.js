import React from 'react';
import './Movie.css'
import { Link } from 'react-router-dom';
import imageNotFound from '../../../assets/imageNotFound.png'

const Movie = (props) => {
    let movie = props.movie;

    return (
        <div className='movieCard'>
            <Link to={`/movie/${movie.id}`}>
                {movie.poster !== `http://image.tmdb.org/t/p/w185${null}` ? <img className='img-responsive' src={movie.poster} alt={movie.title} /> : <img src={imageNotFound} className="img-responsive notFound" alt="not found"></img>}
            </Link>
            <div className='text-ctnr'>
                <h2 className='title'>{movie.title}</h2>
                <p className='date'>{movie.release_date}</p>
                <p className='text'>{movie.description}</p>

                <div className='btn-ctnr'>
                    <Link to={`/movie/edit/${movie.id}`} className='modify'>Modifier</Link>
                    <button className="delete" onClick={(e) => props.onDelete(e, movie)}>Supprimer</button>
                </div>
            </div>
        </div>
    )
}


export default Movie;