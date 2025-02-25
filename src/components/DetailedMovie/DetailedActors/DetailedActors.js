import React from 'react';
import './DetailedActors.css'
import imageNotFound from '../../../assets/imageNotFound.png'

const DetailedActors = (props) => {

    let actor = props.actor;
    return (
        <figure className="actor">
            {/* Affiche une image not found si le film n'a pas d'affiche. */}
            {actor.photo !== `http://image.tmdb.org/t/p/w185${null}` ? <img src={actor.photo} alt={actor.name} />
                : <img src={imageNotFound} className="notFound" alt="not found"></img>}
            <figcaption>
                <h3>{actor.name}</h3>
                <h4>{actor.character}</h4>
            </figcaption>
        </figure>
    )
}

export default DetailedActors;