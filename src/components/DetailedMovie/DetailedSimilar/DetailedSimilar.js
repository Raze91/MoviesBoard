import React from 'react';
import './DetailedSimilar.css'
import imageNotFound from '../../../assets/imageNotFound.png'

const DetailedSimilar = (props) => {

    let similar = props.similar;

    return (
        <figure className="similar">
            {similar.poster !== `http://image.tmdb.org/t/p/w185${null}` ? <img src={similar.poster} alt={similar.title} />
            : <img src={imageNotFound} className="notFound" alt="not found"></img>}
            <figcaption>
                <h3>{similar.title}</h3>
                <h4>{similar.release_date}</h4>
            </figcaption>
        </figure>
    )
}

export default DetailedSimilar;