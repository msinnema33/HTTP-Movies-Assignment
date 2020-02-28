import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import MovieUpdate from './Movies/MovieUpdate';
import Movie from "./Movies/Movie";
import axios from 'axios';

const App = (props) => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <div>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id" render={props =><Movie {...props} addToSavedList={addToSavedList} items={movieList}/>} />
       
      <Route exact path="/update-movie/:id" render={props =><MovieUpdate {...props} items={movieList} />} />
    </div>
  );
};

export default App;
