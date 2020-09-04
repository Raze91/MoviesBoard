import React, { useState } from 'react';
import './EditMovie.css'
import { useParams } from 'react-router-dom';


const EditMovie = (props) => {
    
    let id = useParams();
    
    let editedMovie = props.movies.filter(movie => movie.id == id.id)[0];
    console.log(props.movies)
    console.log(editedMovie)

    const [formData, setFormData] = useState({
        title: editedMovie.title,
        release_date: editedMovie.release_date,
        categories: editedMovie.categories,
        description: editedMovie.description,
        poster: editedMovie.poster,
        backdrop: editedMovie.backdrop,
        actors: editedMovie.actors,
        similar_movies: editedMovie.similar_movies,
    });


    const onUpdateData = event => {
        const target = event.target,
            value = target.value,
            name = target.name;

        const data = { ...formData };
        data[name] = value;
        console.log('data', data)
        setFormData(data);
    };

    console.log('FORM DATA', formData)

    return (
        <form className="addForm">
            <h1>Formulaire de modification de film</h1>

            <label>Titre : </label>
            <input required type='text' name="title" defaultValue={editedMovie.title} onChange={onUpdateData}></input>

            <label>Date de l'ajout : </label>
            <input required type="date" name="date" defaultValue={editedMovie.release_date} onChange={onUpdateData}></input>

            <label>Catégorie(s) : </label>
            <input required type="text" name="categories" defaultValue={editedMovie.categories} onChange={onUpdateData}></input>

            {editedMovie.similar_movies ?
                editedMovie.similar_movies.map((similar, index) => (
                    <label key={index}>Titres similaire {index} :
                        <input required type="text" defaultValue={similar.title} onChange={onUpdateData}></input>
                    </label>
                )) : <p>Pas de films similaires</p>
            }
            {editedMovie.actors ?
                editedMovie.actors.map((actor, index) => (
                    <label key={index}>Acteur {index} :
                        <input required type="text" defaultValue={actor.name} onChange={onUpdateData}></input>
                    </label>
                )) : <p>Pas d'acteur</p>
            }

            <label>Description : </label>
            <textarea required type="text" name="description" defaultValue={editedMovie.description} onChange={onUpdateData}></textarea>

            <input type="submit" value="Modifier" onClick={(e) => props.onEdit(e, formData, editedMovie.id)}></input>
        </form>
    )
}

export default EditMovie;