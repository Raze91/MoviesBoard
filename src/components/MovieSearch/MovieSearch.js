import React, { useState } from 'react';
import './MovieSearch.css';
import axios from 'axios'
import SearchResultList from '../SearchResultList/SearchResultList.js'

const MovieSearch = () => {

    const url = "https://api.themoviedb.org/3/search/movie?";
    const API_Key = '4352608bd1a7a23bfe98f97c35c7468e';


    const [title, setTitle] = useState();
    const [date, setDate] = useState();

    const [searchResultList, setSearchResultList] = useState([]);

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
            console.log(result)
            setSearchResultList(result);
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <form onSubmit={(e) => {onSearch(e)}}>

            <legend>Rechercher les films</legend>


            <label>Titre : </label>
            <input type='text' onChange={(e) => { onTitleChange(e) }} ></input>

            <label>Date de sortie : </label>
            <input type='date' onChange={(e) => { onDateChange(e) }}></input>


            <input type='submit' value='Rechercher'></input>

            < SearchResultList searchResultList={searchResultList}/>
        </form>
    )
}

export default MovieSearch;