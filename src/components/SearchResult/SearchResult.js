import React from 'react';
import './SearchResult.css'
import { Link } from 'react-router-dom';


const SearchResult = (props) => {
    let resultMovie = props.movie;

    return (
        <section className='movieCard'>
            <img className='img-responsive' src={`http://image.tmdb.org/t/p/w185${resultMovie.poster_path}`} alt='Film correspondant à la recherche' />
            <div className='text-ctnr'>
                <h2 className='title'>{resultMovie.title}</h2>
                <p className='date'>{resultMovie.release_date}</p>

                <div className='btn-ctnr'>
                    <Link to='/add' className='add'>Ajouter</Link>
                </div>
            </div>
        </section>
    )
}

export default SearchResult;
