import React, { useState } from 'react';
import './AddMovie.css'
import { useParams } from 'react-router';

const AddMovie = (props) => {

    let movie = props.selectedMovie;
    let Movie;
    let id = useParams();

    if (movie.title === undefined) {
        Movie = movie.filter(movie => movie.id == id.id)[0];
    }

    // const [formData, setFormData] = useState({
    //     title: movie.title,
    //     originalTitle: movie.original_title,
    //     date: movie.release_date,
    //     language: movie.original_language,
    //     categories: movie.categories,
    //     description: movie.overview
    //   });

    const onUpdateData = event => {
        const target = event.target,
            value = target.value,
            name = target.name;

        // const data = { ...formData };

        // data[name] = value;
        // setFormData(data);

        // console.log(data)
    };

    //   console.log(formData)

    return (
        <>
            {Movie !== undefined  ?
                <form className="addForm">
                    {movie.title === undefined ?
                        <>
                            <h1>Formulaire de modification de film</h1>

                            <label>Titre : </label>
                            <input required type='text' name="title" defaultValue={Movie.title} onChange={onUpdateData}></input>

                            <label>Date de l'ajout : </label>
                            <input required type="date" name="date" defaultValue={Movie.release_date} onChange={onUpdateData}></input>

                            <label>Catégorie(s) : </label>
                            <input required type="text" name="categories" defaultValue={Movie.categories} onChange={onUpdateData}></input>

                            {Movie.similar_movies ?
                                Movie.similar_movies.map((similar, index) => (
                                    <label key={index}>Titres similaire {index} :
                                        <input required type="text" defaultValue={similar.title}></input>
                                    </label>
                                )) : <p>Pas de films similaires</p>
                            }

                            {Movie.actors ?
                                Movie.actors.map((actor, index) => (
                                    <label key={index}>Acteur {index} :
                                        <input required type="text" defaultValue={actor.name}></input>
                                    </label>
                                )) : <p>Pas d'acteur</p>
                            }

                            <label>Description : </label>
                            <textarea required type="text" name="description" defaultValue={Movie.description} onChange={onUpdateData}></textarea>

                            <input type="submit" value="Modifier" onClick={(e) => props.onCreate(e, Movie)}></input>
                        </>
                        :
                        <>
                            <h1>Formulaire d'ajout de film</h1>

                            <label>Titre : </label>
                            <input required type='text' name="title" defaultValue={movie.title} onChange={onUpdateData}></input>

                            <label>Titre d'origine : </label>
                            <input required type="text" name="originalTitle" defaultValue={movie.original_title} onChange={onUpdateData}></input>

                            <label>Date de l'ajout : </label>
                            <input required type="date" name="date" defaultValue={movie.release_date} onChange={onUpdateData}></input>

                            <label>Langue d'origine : </label>
                            <input required type='text' name="language" defaultValue={movie.original_language} onChange={onUpdateData}></input>

                            <label>Catégorie(s) : </label>
                            <input required type="text" name="categories" defaultValue={movie.categories} onChange={onUpdateData}></input>

                            {movie.similar_movies ?
                                movie.similar_movies.map((similar, index) => (
                                    <label key={index}>Titres similaire {index} :
                                        <input required type="text" defaultValue={similar.title}></input>
                                    </label>
                                )) : <p>Pas de films similaires</p>
                            }

                            {movie.actors ?
                                movie.actors.map((actor, index) => (
                                    <label key={index}>Acteur {index} :
                                        <input required type="text" defaultValue={actor.name}></input>
                                    </label>
                                )) : <p>Pas d'acteur</p>
                            }

                            <label>Description : </label>
                            <textarea required type="text" name="description" defaultValue={movie.overview} onChange={onUpdateData}></textarea>

                            <input type="submit" value="Créer" onClick={(e) => props.onCreate(e, movie)}></input>
                        </>
                    }
                </form>
        : <h1>Ce film n'existe pas</h1>}

        </>
    )
}


export default AddMovie;