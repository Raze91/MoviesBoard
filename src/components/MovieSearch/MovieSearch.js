import React, { useState } from 'react';
import './MovieSearch.css';
import axios from 'axios'
import SearchResultList from '../SearchResultList/SearchResultList.js'
import AddMovie from '../AddMovie/AddMovie';

const MovieSearch = () => {

    let selectedChildMovie;
    const url = "https://api.themoviedb.org/3/search/movie?";
    const API_Key = '4352608bd1a7a23bfe98f97c35c7468e';


    const [title, setTitle] = useState();
    const [date, setDate] = useState();
    const [searchResultList, setSearchResultList] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState()
    const [clickedButton, setClickedButton] = useState(false);

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
        axios.get(`${url}api_key=${API_Key}&query=${title}&primary_release_year=${date}`)
            .then((result) => {
                console.log(result.data.results)
                setSearchResultList(result.data.results);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const onAdd = (e, resultMovie) => {
        e.preventDefault();
        onClickedButton();
        setSelectedMovie(resultMovie)
        console.log(resultMovie)
    }

    return (
        <article>
            {!clickedButton ?
                <div>
                    <form className="searchForm" onSubmit={(e) => { onSearch(e) }}>

                        <legend>Rechercher les films</legend>

                        <label>Titre : </label>
                        <input type='text' onChange={(e) => { onTitleChange(e) }} ></input>

                        <label>Date de sortie : </label>
                        <input type='date' onChange={(e) => { onDateChange(e) }}></input>


                        <input type='submit' value='Rechercher'></input>
                    </form>
                    < SearchResultList searchResultList={searchResultList} selectedChildMovie={selectedChildMovie} onClickedButton={onClickedButton} onAdd={onAdd}/>
                </div> : < AddMovie selectedMovie={selectedMovie}/>
                }
        </article>
    )
}

export default MovieSearch;