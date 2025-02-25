import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './DetailedMovie.css'
import DetailedActors from './DetailedActors/DetailedActors';
import DetailedSimilar from './DetailedSimilar/DetailedSimilar'
import imageNotFound from '../../assets/imageNotFound.png';

const DetailedMovie = (props) => {

    let id = useParams();

    let detailedMovie = props.movies.filter(movie => Number(movie.id) === Number(id.id));
    return (
        <article className="detailed">
            {detailedMovie.length > 0 ?
                <section className="detailedCtnr">
                    {/* Affiche l'image d'arrière plan seulement si le film en possède une. */}
                    {detailedMovie[0].backdrop !== 'http://image.tmdb.org/t/p/originalnull' && <img className="backdrop" src={detailedMovie[0].backdrop} alt={`Affiche secondaire de ${detailedMovie[0].title}`} />}
                    {/* Affiche une image not found si le film ne possède pas d'affiche. */}
                    {detailedMovie[0].poster !== `http://image.tmdb.org/t/p/w185${null}` ?
                        // Change les classes de l'affiche si le film possède une image d'arrière plan.
                        <img className={detailedMovie[0].backdrop !== 'http://image.tmdb.org/t/p/originalnull' ? 'poster isBackdrop' : "poster"} src={detailedMovie[0].poster} alt={detailedMovie[0].title} />
                        : <img src={imageNotFound} className="detailedNotFound poster" alt="not found"></img>}
                    <h1 className="detailedTitle" >{detailedMovie[0].title}</h1>
                    <h2 className="detailedDate">{detailedMovie[0].release_date}</h2>
                    <h3 className="detailedCategories">{detailedMovie[0].categories.join(' / ')}</h3>
                    <p className="detailedDescription">{detailedMovie[0].description}</p>
                    <div className='btn-ctnr'>
                        <Link to={`/movie/edit/${detailedMovie[0].id}`} className='modify'>Modifier</Link>
                        <Link to="/" className="back" >Retour</Link>
                        <input className="delete" type="submit" value="Supprimer" onClick={(e) => props.onDelete(e, detailedMovie[0])}></input>
                    </div>
                    <div >
                        <h2>Liste des acteurs</h2>
                        <div className="actorCtnr">
                            {detailedMovie[0].actors.map((actor, key) => (< DetailedActors actor={actor} key={key} />))}
                        </div>
                    </div>
                    <div >
                        {detailedMovie[0].similar_movies.length > 0 ? <><h2>Films similaires</h2>
                            <div className="similarCtnr">
                                {detailedMovie[0].similar_movies.map((similar, key) => (< DetailedSimilar similar={similar} key={key} />))}
                            </div></> : <h2>Ce film n'a pas de films similaires.</h2>}
                    </div>
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