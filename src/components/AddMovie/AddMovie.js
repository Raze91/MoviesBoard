import React, { useState, useEffect } from 'react';
import './AddMovie.css'
import { useParams } from 'react-router';
import axios from 'axios'

const AddMovie = (props) => {

    // let resultMovie = props.selectedMovie;
    console.log('props',props.selectedMovie)

    const [resultMovie, setResultMovie] = useState(props.selectedMovie);
    const [formData, setFormData] = useState({
        title: '',
        originalTitle: '',
        date: '',
        language: '',
        categories: [],
        description: '',
    });
    
    
    // if(resultMovie) {
    //     setMovie(resultMovie);
    //     console.log(movie)
    // }

    console.log('RESULT MOVIE', resultMovie)
    
    useEffect(() => {
        const requestActors = axios.get(`https://api.themoviedb.org/3/movie/${resultMovie.id}/credits?api_key=${props.API_Key}`);
        const requestSimilar = axios.get(`https://api.themoviedb.org/3/movie/${resultMovie.id}/similar?api_key=${props.API_Key}`);
        const requestDetails = axios.get(`https://api.themoviedb.org/3/movie/${resultMovie.id}?api_key=${props.API_Key}`);

        axios.all([requestActors, requestSimilar, requestDetails])
            .then(axios.spread((...res) => {
                const baseActors = res[0];
                const baseSimilar = res[1];
                const baseCategories = res[2];
                console.log('BASE  CATEGORIES ', baseCategories)

                let categories = baseCategories.data.genres;
                let finalCategories = categories.map(category => category.name);
                console.log('CATEGORIES', finalCategories)

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
                setResultMovie({
                    title: resultMovie.title,
                    release_date: resultMovie.release_date,
                    categories: finalCategories,
                    description: resultMovie.overview,
                    poster: `http://image.tmdb.org/t/p/w185${resultMovie.poster_path}`,
                    backdrop: `http://image.tmdb.org/t/p/w185${resultMovie.backdrop_path}`,
                    actors: finalActors,
                    similar_movies: finalSimilar
                })
                
                console.log('MOVIE', resultMovie);
                setFormData({
                    title: resultMovie.title,
                    originalTitle: resultMovie.original_title,
                    date: resultMovie.release_date,
                    language: resultMovie.original_language,
                    categories: finalCategories,
                    description: resultMovie.overview,
                });

            })).catch(err => alert(err));
    }, [])


    let Movie;
    let id = useParams();

    if (resultMovie.title === undefined) {
        Movie = resultMovie.filter(movie => movie.id == id.id)[0];
    }

    

    const onUpdateData = event => {
        const target = event.target,
            value = target.value,
            name = target.name;

        const data = { ...formData };

        data[name] = value;
        setFormData(data);

        console.log('DATA', data)
    };

    console.log('FORM DATA', formData)

    return (
        <form className="addForm">
            {resultMovie.title === undefined && Movie !== undefined ?
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
                    <input required type='text' name="title" defaultValue={resultMovie.title} onChange={onUpdateData}></input>

                    <label>Date de l'ajout : </label>
                    <input required type="date" name="date" defaultValue={resultMovie.release_date} onChange={onUpdateData}></input>

                    <label>Catégorie(s) : </label>
                    <input required type="text" name="categories" defaultValue={resultMovie.categories} onChange={onUpdateData}></input>

                    {resultMovie.similar_movies ?
                        resultMovie.similar_movies.map((similar, index) => (
                            <label key={index}>Titres similaire {index} :
                                <input required type="text" defaultValue={similar.title}></input>
                            </label>
                        )) : <p>Pas de films similaires</p>
                    }
                    {resultMovie.actors ?
                        resultMovie.actors.map((actor, index) => (
                            <label key={index}>Acteur {index} :
                                <input required type="text" defaultValue={actor.name}></input>
                            </label>
                        )) : <p>Pas d'acteur</p>
                    }

                    <label>Description : </label>
                    <textarea required type="text" name="description" defaultValue={resultMovie.overview} onChange={onUpdateData}></textarea>

                    <input type="submit" value="Créer" onClick={(e) => props.onCreate(e, resultMovie)}></input>
                </>
            }
        </form>
    )
}


export default AddMovie;