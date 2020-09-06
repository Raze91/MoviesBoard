import React, { useState } from 'react';
import './MovieSearch.css';
import axios from 'axios'
import SearchResultList from './SearchResultList/SearchResultList.js'
import AddMovie from './AddMovie/AddMovie.js';

const MovieSearch = (props) => {

    const url = "https://api.themoviedb.org/3/search/movie?";

    const [title, setTitle] = useState();
    const [date, setDate] = useState();
    const [searchResultList, setSearchResultList] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState();
    const [clickedButton, setClickedButton] = useState(false);

    const onCreate = (e, movie) => {
        e.preventDefault()
        axios.post('http://localhost:3000/movies', movie)
            .then(result => {
                window.location.replace('/')
            })
            .catch(error => {
                console.log(error)
            })
    }

    const onClickedButton = () => {
        setClickedButton(true);
    }

    const onTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const onDateChange = (e) => {
        setDate(e.target.value);
    }

    const onSearch = (e) => {
        e.preventDefault()
        axios.get(`${url}api_key=${process.env.REACT_APP_API_KEY}&query=${title}&primary_release_year=${date}`)
            .then((result) => {
                setSearchResultList(result.data.results);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const getSelectedMovie = (e, movieResult) => {
        e.preventDefault();
        onClickedButton()
        setSelectedMovie(movieResult)
    }

    return (
        <article>
            {!clickedButton ?
                <div>
                    <h1 className="searchTitle">Rechercher les films</h1>
                    <form className="searchForm" onSubmit={(e) => { onSearch(e) }}>

                        <label>Titre : </label>
                        <input type='text' onChange={(e) => { onTitleChange(e) }} ></input>

                        <label>Date de sortie : </label>
                        <input type='date' onChange={(e) => { onDateChange(e) }}></input>


                        <input type='submit' className="search" value='Rechercher'></input>
                    </form>
                    {searchResultList.length > 0 ? < SearchResultList searchResultList={searchResultList} onClickedButton={onClickedButton} getSelectedMovie={getSelectedMovie} /> : <h1>Aucun film ne correspond à cette recherche.</h1>}

                </div> : < AddMovie selectedMovie={selectedMovie} onCreate={onCreate} />
            }
        </article>
    )
}

export default MovieSearch;