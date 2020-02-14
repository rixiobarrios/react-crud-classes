import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { APIURL } from '../config.js';
import MovieForm from './MovieForm.js';

class MovieCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movie: {
        title: '',
        director: ''
      },
      createdId: null,
      error: false
    };
  }

  handleChange = event => {
    // Every time the user types or pastes something
    // inside an input field in the form, the onChange
    // event listener is fired and calls handleChange.
    // In React, when we want to use the event asynchronously
    // we should call event.persist().  Learn more here:
    // https://reactjs.org/docs/events.html#event-pooling
    event.persist();
    // We'll get the value from the input that was changed
    // using event.target.value.
    // We'll use the name of the input to find out which
    // property in our state object to update using
    // event.target.name.  MAKE SURE THE INPUT HAS A NAME
    // and the name matches the property name in the object
    // exactly.
    // With the spread operator (watch this great video if
    // you're not really clear on how spread works:
    // https://www.youtube.com/watch?v=pYI-UuZVtHI) we can
    // spread the current movies properties and values into
    // the new state object and then we override the one
    // with the changed value.
    this.setState({
      movie: {
        ...this.state.movie,
        [event.target.name]: event.target.value
      }
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const url = `${APIURL}/movies/`;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(this.state.movie)
    })
      .then(response => response.json())
      // We're going to update state so there's a re-render
      // By setting updated to true, we use this value to
      // render a Redirect component from react-router-dom
      // and take the user back to the "show" route which will
      // display the newly updated movie.
      .then(data => {
        this.setState({ createdId: data._id });
      })
      .catch(() => {
        // Update the state if there was an error
        // so we can give feedback to the user!
        this.setState({ error: true });
      });
  };

  render() {
    const { createdId } = this.state;
    // const movie = this.state.movie
    // const createdId = this.state.createdId

    if (createdId) {
      return <Redirect to={`/movies/${createdId}`} />;
    }
    return (
      <>
        <h3>Create a Movie</h3>
        <MovieForm
          movie={this.state.movie}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </>
    );
  }
}

export default MovieCreate;
