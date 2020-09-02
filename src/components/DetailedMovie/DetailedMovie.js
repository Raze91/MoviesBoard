import React  from 'react';
import { useParams } from 'react-router-dom';
import './DetailedMovie.css'

const DetailedMovie = (props) => {

    let id = useParams();
    
    const detailedMovie = props.movies.filter(movie => movie.id == id.id);



    return (
        <h1>detailedMovie</h1>
    )
}

export default DetailedMovie;