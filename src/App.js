import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Movies from './components/Movies/Movies.js'
import DetailedMovie from './components/DetailedMovie/DetailedMovie.js'
import MovieFilter from './components/MovieFilter/MovieFilter.js'
import MovieSearch from './components/MovieSearch/MovieSearch.js'
import AddMovie from './components/AddMovie/AddMovie.js'


function App() {

  const [movies, setMovies] = useState([]);


  const onDelete = (e, movie) => {
    e.preventDefault();

    axios.delete(`http://localhost:3000/movies/${movie.id}`)
      .then(result => {
        console.log(movie.title + ' a été supprimé');
      })
      .catch(error => {
        console.log(error);
      })
  }


  useEffect(() => {
    axios.get('http://localhost:3000/movies')
      .then((result) => {
        console.log(result.data)
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
          < MovieSearch />
        </Route>
        <Route exact path='/AddMovie'>
          < AddMovie />
        </Route>
        <Route exact path="/movie/edit/:id">
          <h1>Page Edit</h1>
        </Route>
      </main>
    </Router>

  );
}

export default App;
