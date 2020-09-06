import React from 'react';
import './SearchResult.css'
import imageNotFound from '../../../../assets/imageNotFound.png';

const SearchResult = (props) => {
    let resultMovie = props.movie;

    return (
        <div className='movieCardSearch'>
            {resultMovie.poster_path !== null ? <img className='img-responsiveSearch' src={`http://image.tmdb.org/t/p/w185${resultMovie.poster_path}`} alt={resultMovie.title} />
            : <img src={imageNotFound} className="img-responsiveSearch" alt="not found"></img>}
            <div className='text-ctnr'>
                <h2 className='title'>{resultMovie.title}</h2>
                {resultMovie.release_date ? <p className='date'>{resultMovie.release_date}</p> : <p>Pas de dates</p>}
                <div className='btn-ctnr'>
                    <button className="add" onClick={(e) => { props.getSelectedMovie(e, resultMovie) }}>Ajouter</button>
                </div>
            </div>
        </div>
    )
}

export default SearchResult;
