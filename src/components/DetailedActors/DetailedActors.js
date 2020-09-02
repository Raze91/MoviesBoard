import React from 'react';
import './DetailedActors.css'


const DetailedActors = (props) => {

    let actor = props.actor;

    return (
        <div className="actor">
            <img src={actor.photo} />
            <div>
                <h3>{actor.name}</h3>
                <h4>{actor.character}</h4>
            </div>
        </div>
    )
}

export default DetailedActors;