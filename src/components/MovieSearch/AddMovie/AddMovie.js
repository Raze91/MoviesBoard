import React, { useState, useEffect } from 'react';
import './AddMovie.css'
import axios from 'axios'

const AddMovie = (props) => {

    const [resultMovie, setResultMovie] = useState(props.selectedMovie);
    const [formData, setFormData] = useState({
        title: '',
        originalTitle: '',
        date: '',
        language: '',
        categories: [],
        description: '',
        poster: '',
        backdrop: '',
        actors: [{}],
        similar_movies: [{}]
    });

    useEffect(() => {
        const requestActors = axios.get(`https://api.themoviedb.org/3/movie/${resultMovie.id}/credits?api_key=${process.env.REACT_APP_API_KEY}`);
        const requestSimilar = axios.get(`https://api.themoviedb.org/3/movie/${resultMovie.id}/similar?api_key=${process.env.REACT_APP_API_KEY}`);
        const requestDetails = axios.get(`https://api.themoviedb.org/3/movie/${resultMovie.id}?api_key=${process.env.REACT_APP_API_KEY}`);

        axios.all([requestActors, requestSimilar, requestDetails])
            .then(axios.spread((...res) => {
                const baseActors = res[0];
                const baseSimilar = res[1];
                const baseCategories = res[2];

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
                setResultMovie({
                    title: resultMovie.title,
                    release_date: resultMovie.release_date,
                    categories: finalCategories,
                    description: resultMovie.overview,
                    poster: `http://image.tmdb.org/t/p/w185${resultMovie.poster_path}`,
                    backdrop: `http://image.tmdb.org/t/p/original${resultMovie.backdrop_path}`,
                    actors: finalActors,
                    similar_movies: finalSimilar
                })

                setFormData({
                    title: resultMovie.title,
                    release_date: resultMovie.release_date,
                    categories: finalCategories,
                    description: resultMovie.overview,
                    poster: `http://image.tmdb.org/t/p/w185${resultMovie.poster_path}`,
                    backdrop: `http://image.tmdb.org/t/p/original${resultMovie.backdrop_path}`,
                    actors: finalActors,
                    similar_movies: finalSimilar
                });

            })).catch(err => alert(err));
    }, [])

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
        <form className="addForm">
            <h1>Formulaire d'ajout de film</h1>

            <label htmlFor="title">Titre : </label>
            <input required type='text' name="title" defaultValue={resultMovie.title} onChange={onUpdateData}></input>

            <label htmlFor="date">Date de l'ajout : </label>
            <input required type="date" name="date" defaultValue={resultMovie.release_date} onChange={onUpdateData}></input>

            {resultMovie.categories ?
                resultMovie.categories.map((category, index) => (
                    <label htmlFor={"category" + index} className="categories" key={index}>Catégorie {index} :
                        <input required type="text" name={"category" + index} defaultValue={category} onChange={(e) => onUpdateData(e, index)}></input>
                    </label>
                )) : <p>Pas de catégories</p>}

            {resultMovie.similar_movies ?
                resultMovie.similar_movies.map((similar, index) => (
                    <label htmlFor={"similar" + (index)} className="similars" key={index}>Titres similaire {index} :
                        <input required type="text" name={"similar" + index} defaultValue={similar.title} onChange={(e) => onUpdateData(e, index)}></input>
                    </label>
                )) : <p>Pas de films similaires</p>
            }
            {resultMovie.actors ?
                resultMovie.actors.map((actor, index) => (
                    <label htmlFor={"actor" + index} className="actors" key={index}>Acteur {index} :
                        <input required type="text" name={"actor" + index} defaultValue={actor.name} onChange={(e) => onUpdateData(e, index)}></input>
                    </label>
                )) : <p>Pas d'acteur</p>
            }
            <label htmlFor="description" >Description : </label>
            <textarea required type="text" className="addDescription" name="description" defaultValue={resultMovie.overview} onChange={onUpdateData}></textarea>

            <input type="submit" className="addSubmit" value="Créer" onClick={(e) => props.onCreate(e, formData)}></input>
        </form>
    )
}


export default AddMovie;