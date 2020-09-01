import React from 'react';
import './SearchResultList.css';


const SearchResultList = (props) => {

    let searchResultList = props.movieResultList;

    return (
        <section>
            {searchResultList.map((movie, index) => (
                <SearchResult movie={movie} key={index} />
            ))}
        </section>
    )
}

export default SearchResultList;