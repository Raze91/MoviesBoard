import React from 'react';
import './DetailedActors.css'


const DetailedActors = (props) => {

    let actor = props.actor;

    return (
        <figure className="actor">
            <img src={actor.photo} />
            <figcaption>
                <h3>{actor.name}</h3>
                <h4>{actor.character}</h4>
            </figcaption>
        </figure>
    )
}

export default DetailedActors;