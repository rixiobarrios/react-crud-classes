import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import MoviesList from './components/MoviesList.js';
import Movie from './components/Movie.js';
import MovieCreate from './components/MovieCreate.js';
import MovieEdit from './components/MovieEdit.js';
import MoviesHome from './components/MoviesHome.js';

const App = () => (
  <>
    <header>
      <Link to="/">Home</Link>
      <Link to="/movies/create">Create</Link>
      <Link to="/movies">All Movies</Link>
    </header>
    <main>
      <Switch>
        <Route exact path="/" component={MoviesHome} />
        <Route exact path="/movies/create" component={MovieCreate} />
        <Route exact path="/movies" component={MoviesList} />
        <Route exact path="/movies/:id" component={Movie} />
        <Route exact path="/movies/:id/edit" component={MovieEdit} />
      </Switch>
    </main>
  </>
);

export default App;
