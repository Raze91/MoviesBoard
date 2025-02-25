import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Movies from './components/Movies/Movies.js'
import DetailedMovie from './components/DetailedMovie/DetailedMovie.js'
import MovieFilter from './components/MovieFilter/MovieFilter.js'
import MovieSearch from './components/MovieSearch/MovieSearch.js'
import EditMovie from './components/EditMovie/EditMovie.js'


function App() {

  const [movies, setMovies] = useState([]);

  // Récupère les données du film à supprimer lorsque l'utilisateur appuie sur le bouton supprimer
  const onDelete = (e, movie) => {
    e.preventDefault();
    // Requête DELETE utilisant l'id du film à supprimer
    axios.delete(`http://localhost:3000/movies/${movie.id}`)
      .then(result => {
        window.location.replace('/')
      })
      .catch(error => {
        console.log(error);
      })
  }
  // Récupère les données du film lorsque l'utilisateur appuie sur le bouton modifier
  const onEdit = (e, movie, id) => {
    e.preventDefault();
    // Requête PUT qui utilise l'id du film à modifier et qui le remplace par l'objet movie
    axios.put(`http://localhost:3000/movies/${id}`, movie)
      .then(result => {
        window.location.replace('/');
      })
      .catch(error => {
        alert(error)
      })
  }

  useEffect(() => {
    // Requête GET qui récupère les données de cette url
    axios.get('http://localhost:3000/movies')
      .then((result) => {
        setMovies(result.data);
      })
      .catch((error) => {
        console.log(error)
      })
  }, []);

  return (
    <Router>
      <main className="App">
        <Route exact path="/">
          < MovieFilter />
          < Movies movies={movies} onDelete={onDelete} />
          <Link className="toMovieSearch" to='/MovieSearch'>Ajouter plus de films</Link>
        </Route>
        <Route exact path='/movie/:id'>
          < DetailedMovie movies={movies} onDelete={onDelete} />
        </Route>
        <Route exact path='/MovieSearch'>
          < MovieSearch movies={movies} />
        </Route>
        <Route exact path="/movie/edit/:id">
          < EditMovie movies={movies} onEdit={onEdit} />
        </Route>
      </main>
    </Router>

  );
}

export default App;
