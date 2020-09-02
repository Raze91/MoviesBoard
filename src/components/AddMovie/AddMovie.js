import React from 'react';
import './AddMovie.css'

const AddMovie = (props) => {

    let movie = props.selectedMovie;

    return (
        <form className="addForm">
            <h1>Formulaire d'ajout de film</h1>

            <label>Titre : </label>
            <input type='text' defaultValue={movie.title}></input>

            <label>Titre d'origine : </label>
            <input type="text" defaultValue={movie.original_title}></input>

            <label>Date de l'ajout : </label>
            <input type="date" defaultValue={movie.release_date}></input>

            <label>Langue d'origine : </label>
            <input type='text' defaultValue={movie.original_language}></input>

            <label>Catégorie(s) : </label>
            <input type="text" defaultValue={movie.categories}></input>

            <label>Titres similaires : </label>
            <input type="text" defaultValue={movie.similar}></input>

            <label>Acteurs : </label>
            <input type="text" defaultValue={movie.actors}></input>

            <label>Description : </label>
            <textarea type="text" defaultValue={movie.overview}></textarea>

            <input type="submit" value="Ajouter"></input>
        </form>
    )
}


export default AddMovie;