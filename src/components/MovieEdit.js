import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { APIURL } from '../config.js';
import MovieForm from './MovieForm.js';

class MovieEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movie: {
        title: '',
        director: ''
      },
      updated: false,
      error: false
    };
  }

  // We want to update the existing movie so we'll get
  // the movie from the API and use it to prepopulate the
  // form.  This is not only helpful when we use PUT instead
  // of PATCH, it's a MUCH better user experience.
  // When the movie is updated in state it will cause a re-
  // render that will pass the movie as props to the form
  // and then we'll use those values to prepopulate the inputs.
  componentDidMount() {
    fetch(`${APIURL}/movies/${this.props.match.params.id}`)
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

    fetch(`${APIURL}/movies/${this.props.match.params.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(this.state.movie)
    })
      // We're going to update state so there's a re-render
      // By setting updated to true, we use this value to
      // render a Redirect component from react-router-dom
      // and take the user back to the "show" route which will
      // display the newly updated movie.
      .then(response => {
        this.setState({ updated: true });
      })
      .catch(() => {
        // Update the state if there was an error
        // so we can give feedback to the user!
        this.setState({ error: true });
      });
  };

  render() {
    if (this.state.error) {
      return <div>Sorry, there seems to be a problem.</div>;
    }

    if (this.state.updated) {
      return <Redirect to={`/movies/${this.props.match.params.id}`} />;
    }
    return (
      <>
        <h3>Update a Movie</h3>
        <MovieForm
          movie={this.state.movie}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </>
    );
  }
}

export default MovieEdit;
