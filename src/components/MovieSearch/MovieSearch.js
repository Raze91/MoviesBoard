import React, { useState } from 'react';
import './MovieSearch.css';
import axios from 'axios'
import SearchResultList from './SearchResultList/SearchResultList.js'
import AddMovie from './AddMovie/AddMovie.js';

const MovieSearch = (props) => {

    // URL de l'api TheMovieDatabase
    const url = "https://api.themoviedb.org/3/search/movie?";

    const [title, setTitle] = useState();
    const [date, setDate] = useState();
    const [searchResultList, setSearchResultList] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState();
    const [clickedButton, setClickedButton] = useState(false);

    // Fonction de création de film
    const onCreate = (e, movie) => {
        e.preventDefault();
        // Requête POST qui envoie les données du film au serveur local
        axios.post('http://localhost:3000/movies', movie)
            .then(result => {
                window.location.replace('/')
            })
            .catch(error => {
                console.log(error)
            })
    }
    // Fonction qui set le boolean servant à afficher ou non le formulaire d'ajout
    const onClickedButton = () => {
        setClickedButton(true);
    }
    // Fonction qui récupère la valeur de l'input Titre
    const onTitleChange = (e) => {
        setTitle(e.target.value);
    }
    // Récupère la valeur de l'input Date
    const onDateChange = (e) => {
        setDate(e.target.value);
    }
    // Lance la recherche avec la requête axios.get et récupère les données des films
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
    // Récupère les données du film lorsque l'utilisateur appuie sur le bouton ajouter et les stockent dans le state SelectedMovie
    const getSelectedMovie = (e, movieResult) => {
        e.preventDefault();
        onClickedButton()
        setSelectedMovie(movieResult)
    }
    return (
        <article>
            {/* Si l'utilisateur n'a pas appuyé sur un bouton ajouter, la page de recherche s'affiche. Sinon le formulaire d'ajout s'affiche */}
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
                    {/* Si au moins un film correspond à la recherche, la liste des films s'affiche. Sinon un message indique qu'il n'y a pas de film */}
                    {searchResultList.length > 0 ? < SearchResultList searchResultList={searchResultList} onClickedButton={onClickedButton} getSelectedMovie={getSelectedMovie} /> : <h1>Aucun film ne correspond à cette recherche.</h1>}

                </div> : < AddMovie selectedMovie={selectedMovie} onCreate={onCreate} />
            }
        </article>
    )
}

export default MovieSearch;