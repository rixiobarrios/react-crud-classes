import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { APIURL } from '../config.js';

class MoviesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      error: false
    };
  }

  componentDidMount() {
    // load the movies when the component is mounted
    fetch(`${APIURL}/movies`)
      .then(response => response.json())
      .then(data => {
        // Update state with successful movie data
        this.setState({ movies: data });
      })
      .catch(() => {
        // Update the state if there was an error
        // so we can give feedback to the user!
        this.setState({ error: true });
      });
  }

  render() {
    // Check if there was an error
    // If there is give the user feedback!
    if (this.state.error) {
      return <div>Sorry, there was a problem getting the movies</div>;
    }

    // Check if we have our movies
    // Display "Loading..." if not
    if (this.state.movies.length === 0) {
      return <div>Loading...</div>;
    }

    // If neither of the if statements ran
    // then we have data and can map over the
    // movies array to display the movies.
    return (
      <ul>
        {this.state.movies.map(movie => (
          <li key={movie._id}>
            <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    );
  }
}

export default MoviesList;
