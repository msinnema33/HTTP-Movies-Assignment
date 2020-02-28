import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch, useHistory } from 'react-router-dom';
import MovieCard from './MovieCard';

function Movie({ addToSavedList }, props) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();
  const history = useHistory();
  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const handleDelete = e => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${e.id}`)  
      .then(res =>{console.log(res)
        const arr = props.movieList.filter((item)=>`${item.id}` !==e.id)
        console.log(arr)
        props.setMovie(arr)
        history.push('/')
      })
      .catch(err => console.log(err));
  };
  const handleUpdate = e => {
    e.preventDefault();
    history.push(`/update-movie/${movie.id}`);
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <div className='save-button' onClick={saveMovie}>
        Save
      </div>
      <button onClick={handleDelete} className='delete-button'>
      Delete Movie
      </button>
      <button onClick={handleUpdate} className="edit-button">
        Edit Movie
      </button>
    </div>
  );
}

export default Movie;
