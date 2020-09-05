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

  const onDelete = (e, movie) => {
    e.preventDefault();

    axios.delete(`http://localhost:3000/movies/${movie.id}`)
      .then(result => {
        alert(movie.title + ' a été supprimé !');
        window.location.replace('/')
      })
      .catch(error => {
        alert(error);
      })
  }

  const onEdit = (e, movie, id) => {
    e.preventDefault();

    console.log(movie);

    axios.put(`http://localhost:3000/movies/${id}`, movie)
      .then(result => {
        alert(movie.title + ' a été modifié !');
        window.location.replace('/');
      })
      .catch(error => {
        alert(error)
      })
  }

  useEffect(() => {
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
