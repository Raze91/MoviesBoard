import React from 'react';
import './SearchResult.css'

const SearchResult = (props) => {
    let resultMovie = props.movie;

    return (
        <div className='movieCardSearch'>
            <img className='img-responsiveSearch' src={`http://image.tmdb.org/t/p/w185${resultMovie.poster_path}`} alt={resultMovie.title} />
            <div className='text-ctnr'>
                <h2 className='title'>{resultMovie.title}</h2>
                <p className='date'>{resultMovie.release_date}</p>

                <div className='btn-ctnr'>
                    <button onClick={(e) => { props.getSelectedMovie(e, resultMovie) }}>Ajouter</button>
                </div>
            </div>
        </div>
    )
}

export default SearchResult;
