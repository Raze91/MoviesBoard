import React from 'react';
import './MovieFilter.css'

const MovieFilter = () => {


    return (
        <section>

            <form>
                <legend>Filtrer les films</legend>

            
                <label>Titre : </label>
                <input type='text'></input>

                <label>Date de sortie : </label>
                <input type='date'></input>

                <label>Catégorie : </label>
                <input type='text'></input>
            </form>
        </section>
    )
}

export default MovieFilter;