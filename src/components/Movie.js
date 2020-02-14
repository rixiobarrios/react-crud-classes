import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { APIURL } from '../config.js';

class Movie extends Component {
  constructor() {
    super();

    // initialize our state to make the constructor useFUL
    this.state = {
      movie: null,
      deleted: false,
      error: false
    };
  }

  componentDidMount() {
    const url = `${APIURL}/movies/${this.props.match.params.id}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Update state with successful movie data
        this.setState({ movie: data });
      })
      .catch(() => {
        // Update the state if there was an error
        // so we can give feedback to the user!
        this.setState({ error: true });
      });
  }

  onDeleteMovie = event => {
    const url = `${APIURL}/movies/${this.props.match.params.id}`;
    fetch(url, { method: 'DELETE' })
      .then(res => {
        this.setState({ deleted: true });
      })
      .catch(console.error);
  };

  render() {
    // If we deleted the movie, redirect back to the movies list
    if (this.state.deleted) {
      return <Redirect to="/movies" />;
    }

    // Check if there was an error
    // If there is give the user feedback!
    if (this.state.error) {
      return <div>Sorry, there was a problem getting the movies</div>;
    }

    // Check if we have our movies
    // Display "Loading..." if not
    if (!this.state.movie) {
      return <div>Loading...</div>;
    }

    // If none of the if statements ran
    return (
      <div>
        <h3>Title: {this.state.movie.title}</h3>
        <p>Director: {this.state.movie.director}</p>
        <button onClick={this.onDeleteMovie}>Delete Movie</button>
        <Link to={`/movies/${this.props.match.params.id}/edit`}>
          Update Movie
        </Link>
      </div>
    );
  }
}

export default Movie;
