import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Movies from './components/Movies/Movies.js'
import DetailedMovie from './components/DetailedMovie/DetailedMovie.js'
import MovieFilter from './components/MovieFilter/MovieFilter.js'

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
        </Route>
        <Route exact path='/detailed'>
          < DetailedMovie />
        </Route>
      </main>
    </Router>
  );
}

export default App;
