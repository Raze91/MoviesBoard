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

// const axios = require('axios');


function App() {

  const [movies, setMovies] = useState([]);


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
          < Movies movies={movies} />
          <Link className="toMovieSearch" to='/MovieSearch'>Ajouter plus de films</Link>
        </Route>
        <Route exact path='/movie/:id'>
          < DetailedMovie movies={movies}/>
        </Route>
        <Route exact path='/MovieSearch'>
          < MovieSearch />
        </Route>
        <Route exact path='/AddMovie'>
          < AddMovie />
        </Route>
      </main>
    </Router>

  );
}

export default App;
