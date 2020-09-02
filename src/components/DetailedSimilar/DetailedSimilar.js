import React from 'react';
import './DetailedSimilar.css'

const DetailedSimilar = (props) => {

    let similar = props.similar;

    return (
        <figure className="similar">
            <img src={similar.poster} />
            <figcaption>
                <h3>{similar.title}</h3>
                <h4>{similar.release_date}</h4>
            </figcaption>
        </figure>
    )
}

export default DetailedSimilar;