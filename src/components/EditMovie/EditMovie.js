import React, { useState } from 'react';
import './EditMovie.css'
import { useParams } from 'react-router-dom';


const EditMovie = (props) => {

    let id = useParams();

    let editedMovie = props.movies.filter(movie => Number(movie.id) === Number(id.id))[0];

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

    const onUpdateData = (event, index) => {
        const target = event.target,
            value = target.value,
            name = target.name;

        const data = { ...formData };

        switch (name) {
            case "category" + index:
                data.categories[index] = value;
                break;
            case 'similar' + index:
                data.similar_movies[index].title = value;
                break;
            case 'actor' + index:
                data.actors[index].name = value;
                break;
            default:
                data[name] = value;
                setFormData(data);
                break;
        }
    };

    return (
        <form className="editForm">
            <h1>Formulaire de modification de film</h1>

            <label htmlFor="title" >Titre : </label>
            <input required type='text' name="title" defaultValue={editedMovie.title} onChange={onUpdateData}></input>

            <label htmlFor="date" >Date de l'ajout : </label>
            <input required type="date" name="date" defaultValue={editedMovie.release_date} onChange={onUpdateData}></input>

            {editedMovie.categories ?
                editedMovie.categories.map((category, index) => (
                    <label htmlFor={"category" + index} className="categories" key={index}>Catégorie {index} :
                        <input required type="text" name={"category" + index} defaultValue={category} onChange={(e) => onUpdateData(e, index)}></input>
                    </label>
                )) : <p>Pas de catégories</p>}

            {editedMovie.similar_movies ?
                editedMovie.similar_movies.map((similar, index) => (
                    <label htmlFor={"similar" + index} className="similars" key={index}>Titre similaire {index} :
                        <input required type="text" name={"similar" + index} defaultValue={similar.title} onChange={(e) => onUpdateData(e, index)}></input>
                    </label>
                )) : <p>Pas de films similaires</p>
            }
            {editedMovie.actors ?
                editedMovie.actors.map((actor, index) => (
                    <label htmlFor={"actor" + index} className="actors" key={index}>Acteur {index} :
                        <input required type="text" name={"actor" + index} defaultValue={actor.name} onChange={(e) => onUpdateData(e, index)}></input>
                    </label>
                )) : <p>Pas d'acteur</p>
            }

            <label htmlFor="description">Description : </label>
            <textarea required type="text" name="description" className="addDescription" defaultValue={editedMovie.description} onChange={onUpdateData}></textarea>

            <input type="submit" className="editSubmit" value="Modifier" onClick={(e) => props.onEdit(e, formData, editedMovie.id)}></input>
        </form>
    )
}

export default EditMovie;