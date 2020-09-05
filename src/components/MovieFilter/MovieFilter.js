import React from 'react';
import './MovieFilter.css'

const MovieFilter = () => {

    return (
        <header>

            <h1 className="filterTitle">Filtrer les films</h1>
            <form className="filterForm">

                <label htmlFor="title">Titre : </label>
                <input type='text' name="title" className="textInput" placeholder="Entrez le titre du film"></input>


                <label htmlFor="date">Date de sortie : </label>
                <input type='date' name="date" className="dateInput"></input>

                <label htmlFor="categories">Catégorie : </label>
                <input type='text' name="categories" className="categoriesInput"></input>

                <input type='submit' className="submit" value='Filtrer'></input>
            </form>
        </header>
    )
}

export default MovieFilter;