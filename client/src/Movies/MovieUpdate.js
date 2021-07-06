import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const initialItem = {
    title: '',
    director: '',
    metascore: '',
    stars: '',
}

const MovieUpdate = props => {
    const [ item, setItem ] = useState(initialItem);
    const { id } = useParams();

    useEffect(() => {
        const itemToUpdate = props.items.find(thing => `${thing.id}` === id);
         if (itemToUpdate) {
          setItem(itemToUpdate);
        }
      }, [props.items, id]);

      const changeHandler = e => {
        e.persist();
        let value = e.target.value;
        let stars = e.target.value;
        if (e.target.name === 'metascore') {
          value = parseInt(value, 10);
        }
        if (e.target.stars === 'string') {
            stars = stars.split(',');
        }
    
        setItem({
          ...item,
          [e.target.name]: value,
          [e.target.name]: stars
        });
      };  

      const handleSubmit = e => {
        e.preventDefault();
        axios
          .put(`http://localhost:5000/items/${id}`, item)
          .then(res => {
            props.setItems(res.data);
            props.history.push(`/movies/${id}`);
          })
          .catch(err => console.log(err));
      };  

      return (
        <div>
          <h2>Update Movie</h2>
    
          <form onSubmit={handleSubmit}>
            <input
              type="number"
              name="id"
              onChange={changeHandler}
              placeholder="id"
              value={item.id}
            />
            <div className="baseline" />
    
            <input
              type="text"
              name="title"
              onChange={changeHandler}
              placeholder="Title"
              value={item.title}
            />
            <div className="baseline" />
    
            <input
              type="string"
              name="director"
              onChange={changeHandler}
              placeholder="Director"
              value={item.director}
            />
            <div className="baseline" />
    
            <input
              type="text"
              name="stars"
              onChange={changeHandler}
              placeholder="stars"
              value={item.stars}
            />
            <div className="baseline" />

            <input
              type="number"
              name="metascore"
              onChange={changeHandler}
              placeholder="metascore"
              value={item.metascore}
            />
            <div className="baseline" />
    
            <button className="md-button form-button">Update Movie</button>
          </form>
        </div>
      );  
};

export default MovieUpdate;