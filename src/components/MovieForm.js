import React from 'react';

const MovieForm = ({ movie, handleSubmit, handleChange }) => (
  <form onSubmit={handleSubmit}>
    <label htmlFor="title">Title</label>
    <input
      placeholder="Film Title"
      value={movie.title}
      name="title"
      onChange={handleChange}
      required
      id="title"
    />

    <label htmlFor="director">Director</label>
    <input
      placeholder="Director Name"
      value={movie.director}
      name="director"
      onChange={handleChange}
      id="director"
    />

    <button type="submit">Submit</button>
  </form>
);

export default MovieForm;
