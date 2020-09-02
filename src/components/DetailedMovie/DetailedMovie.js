import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './DetailedMovie.css'
import DetailedActors from '../DetailedActors/DetailedActors';

const DetailedMovie = (props) => {

    let id = useParams();

    let detailedMovie = props.movies.filter(movie => movie.id == id.id);

    console.log(detailedMovie[0]);
    return (
        <article className="detailed">
            {detailedMovie.length > 0 ?
                <section className="detailedCtnr">
                    <img className="poster" src={detailedMovie[0].poster} />
                    <h1 className="detailedTitle" >{detailedMovie[0].title}</h1>
                    <h2 className="detailedDate">{detailedMovie[0].release_date}</h2>
                    <h3 className="detailedCategories">{detailedMovie[0].categories.join(' / ')}</h3>
                    <p className="detailedDescription">{detailedMovie[0].description}</p>
                    <div className="actorCtnr">
                        {detailedMovie[0].actors.map((actor, key) => (< DetailedActors actor={actor} />))}
                    </div>
                    <div className='btn-ctnr'>
                        <Link to='/modify' className='modify'>Modifier</Link>
                        <Link to='/delete' className='delete'>Supprimer</Link>
                    </div>
                    <img className="backdrop" src={detailedMovie[0].backdrop} />
                </section>

                :
                <section className="detailedErrorCtnr">
                    <h1 className="detailedError">Ce film n'est pas dans votre bibliothèque</h1>
                </section>
            }

        </article>
    )
}

export default DetailedMovie;