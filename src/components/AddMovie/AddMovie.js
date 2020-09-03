import React, {useState} from 'react';
import './AddMovie.css'

const AddMovie = (props) => {

    let movie = props.selectedMovie;

    console.log(movie.categories);
    

    const [formData, setFormData] = useState({
        title: movie.title,
        originalTitle: movie.original_title,
        date: movie.release_date,
        language: movie.original_language,
        categories: movie.categories,
        description: movie.overview
      });

      const onUpdateData = event => {
        const target = event.target,
          value = target.value,
          name = target.name;
     
        const data = { ...formData };
        if(name === 'categories') {
            console.log(target);
        }
        data[name] = value;
        setFormData(data);

        console.log(data)
      };

      const onUpdateCategories = event => {
        console.log()
      }

      console.log(formData)
    
    return (
        <form className="addForm">
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

            <input type="submit" value="Créer" onClick={(e) => props.onCreate(e, formData)}></input>
        </form>
    )
}


export default AddMovie;