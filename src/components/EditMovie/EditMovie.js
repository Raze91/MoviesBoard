import React, { useState } from 'react';
import './EditMovie.css'
import { useParams } from 'react-router-dom';


const EditMovie = (props) => {

    let id = useParams();
    // Filtre pour trouver le film que l'utilisateur souhaite modifier parmi les films de sa bibliothèque.
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

    // Fonction appelée à chaque changement de value dans les input
    const onUpdateData = (event, index) => {
        // Récupère les données de l'input
        const target = event.target,
            value = target.value,
            name = target.name;
        // Créer un objet data qui contient les données de formData
        const data = { ...formData };

        switch (name) {
            // Gère le cas de scénario ou l'input modifié est celui des catégories
            case "category" + index:
                data.categories[index] = value;
                break;
            // Gère le cas de scénario ou l'input modifié est celui des films similaires
            case 'similar' + index:
                data.similar_movies[index].title = value;
                break;
            // L'input modifié est celui des acteurs
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
            {/* Si le film possède des catégories, alors elles seront affichées dans le formulaire. Sinon un message indiquera qu'il n'en possède pas. */}
            {editedMovie.categories ?
                editedMovie.categories.map((category, index) => (
                    <label htmlFor={"category" + index} className="categories" key={index}>Catégorie {index} :
                        <input required type="text" name={"category" + index} defaultValue={category} onChange={(e) => onUpdateData(e, index)}></input>
                    </label>
                )) : <p>Pas de catégories</p>}
            {/* Si le film possède des films similaires, alors ils seront affichées dans le formulaire. Sinon un message indiquera qu'il n'en possède pas. */}
            {editedMovie.similar_movies ?
                editedMovie.similar_movies.map((similar, index) => (
                    <label htmlFor={"similar" + index} className="similars" key={index}>Titre similaire {index} :
                        <input required type="text" name={"similar" + index} defaultValue={similar.title} onChange={(e) => onUpdateData(e, index)}></input>
                    </label>
                )) : <p>Pas de films similaires</p>
            }
            {/* Si le film possède des acteurs, alors ilss seront affichées dans le formulaire. Sinon un message indiquera qu'il n'en possède pas. */}
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