import React from 'react';
import './SearchResultList.css';
import SearchResult from '../SearchResult/SearchResult.js'

const SearchResultList = (props) => {

    let searchResultList = props.searchResultList;

    return (
        <section className='list-ctnr'>
            {searchResultList.map((movie, index) => (
                <SearchResult movie={movie} key={index} />
            ))}
        </section>
    )
}

export default SearchResultList;