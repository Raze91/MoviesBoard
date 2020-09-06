import React from 'react';
import './MovieFilter.css'

const MovieFilter = () => {

    return (
        <section>

            <h1 className="filterTitle">Filtrer les films</h1>
            <form className="filterForm">

                <label htmlFor="title">Titre : </label>
                <input required type='text' name="title" className="textInput" placeholder="Entrez le titre du film"></input>


                <label htmlFor="date">Date de sortie : </label>
                <input type='date' name="date" className="dateInput"></input>

                <label htmlFor="categories">Catégorie : </label>
                <input type='text' name="categories" className="categoriesInput" placeholder="Entrez une catégorie"></input>

                <input type='submit' className="submit" value='Filtrer'></input>
            </form>
        </section>
    )
}

export default MovieFilter;