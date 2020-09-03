import React from 'react';
import './AddMovie.css'

const AddMovie = (props) => {

    let movie = props.selectedMovie;

    console.log(movie);

    
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

            {movie.similar_movies ?
                movie.similar_movies.map((similar, index) => (
                    <label key={index}>Titres similaire {index} :
                        <input type="text" defaultValue={similar.title}></input>
                    </label>
                )) : <p>Pas de films similaires</p>
            }

            {movie.actors ?
                movie.actors.map((actor, index) => (
                    <label key={index}>Acteur {index} :
                        <input type="text" defaultValue={actor.name}></input>
                    </label>
                )) : <p>Pas d'acteur</p>
            }

            <label>Description : </label>
            <textarea type="text" defaultValue={movie.overview}></textarea>

            <input type="submit" value="Créer" onClick={(e) => props.onCreate(e, movie)}></input>
        </form>
    )
}


export default AddMovie;