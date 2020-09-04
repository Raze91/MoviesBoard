import React, { useState } from 'react';
import './MovieSearch.css';
import axios from 'axios'
import SearchResultList from './SearchResultList/SearchResultList.js'
import AddMovie from '../AddMovie/AddMovie';

const MovieSearch = (props) => {

    let movies = props.movies;
    console.log(movies)
    const url = "https://api.themoviedb.org/3/search/movie?";
    const API_Key = '4352608bd1a7a23bfe98f97c35c7468e';


    const [title, setTitle] = useState();
    const [date, setDate] = useState();
    const [searchResultList, setSearchResultList] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState();
    const [clickedButton, setClickedButton] = useState(false);


    const onCreate = (e, movie) => {
        e.preventDefault()
        console.log(movie)
        axios.post('http://localhost:3000/movies', movie)
            .then(result => {
                console.log('Film créé', result);
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
        setSelectedMovie(resultMovie);
        console.log(resultMovie.poster_path)

        const requestActors = axios.get(`https://api.themoviedb.org/3/movie/${resultMovie.id}/credits?api_key=${API_Key}`);
        const requestSimilar = axios.get(`https://api.themoviedb.org/3/movie/${resultMovie.id}/similar?api_key=${API_Key}`);
        const requestDetails = axios.get(`https://api.themoviedb.org/3/movie/${resultMovie.id}?api_key=${API_Key}`);

        axios.all([requestActors, requestSimilar, requestDetails]).then(axios.spread((...res) => {
            const baseActors = res[0];
            const baseSimilar = res[1];
            const baseCategories = res[2];
            console.log('BASE DETAILS ',baseCategories)

            let categories = baseCategories.data.genres;
            let finalCategories = categories.map(category => category.name);
            let actors = baseActors.data.cast.slice(0, 6).map(actor => actor)
            
            let finalActors = [];
            actors.map(actor => {
                finalActors.push({
                    name: actor.name,
                    photo: `http://image.tmdb.org/t/p/w185${actor.profile_path}`,
                    character: actor.character
                })
            })
            
            
                
            const similar = baseSimilar.data.results.slice(0, 3).map(similar => similar)

            let finalSimilar = [];
            similar.map(similar => {
                finalSimilar.push({
                    title: similar.title,
                    poster: `http://image.tmdb.org/t/p/w185${similar.poster_path}`,
                    release_date: similar.release_date
                })
            })
            // setSelectedMovie({...resultMovie, actors: finalActors, similar: finalSimilar, categories: finalCategories});
                setSelectedMovie({
                    title: resultMovie.title,
                    release_date: resultMovie.release_date,
                    categories: finalCategories,
                    description: resultMovie.overview,
                    poster: `http://image.tmdb.org/t/p/w185${resultMovie.poster_path}`,
                    backdrop: `http://image.tmdb.org/t/p/w185${resultMovie.backdrop_path}`,
                    actors: finalActors,
                    similar_movies: finalSimilar
                })
                if(selectedMovie !== undefined) {
                    
                    console.log(selectedMovie)
                }
            
        })).catch(err => alert(err));
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
                    < SearchResultList searchResultList={searchResultList} onClickedButton={onClickedButton} onAdd={onAdd} />
                </div> : < AddMovie selectedMovie={selectedMovie} onCreate={onCreate} />
            }
        </article>
    )
}

export default MovieSearch;