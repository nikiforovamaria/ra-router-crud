import React, { useState, useEffect, useContext } from 'react';
import {Redirect} from 'react-router-dom';
import PostsContext from '../context/PostsContext.js';
import useJsonFetch from '../hooks/useJsonFetch.js'

export default function NewPost(props) {
  const { posts, setPosts, url } = useContext(PostsContext);
  const [value, setValue] = useState();
  const [zapros, setZapros, data, loading] = useJsonFetch();
  const { history} = props;
  // console.log(props.match);


  const handleClose = () => {
    history.goBack();
    // setRedirectActive(true);
  };

  const handleChange = (evt) => {
    setValue(evt.target.value);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setZapros({
      url: `${url}posts`,
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: 0,
        content: value,
      }),
    });
  };

  useEffect(() => {
    if (data) {
      history.goBack();
    }
  }, [data])

  return (
    <div className="new-post">
      <div className="top"><span onClick={handleClose}>X</span></div>
      <form onSubmit={handleSubmit}>
        <textarea name="text" onChange={handleChange} value={value} />
        <div className="submit">
          <button type="submit" className="button">Опубликовать</button>
        </div>
      </form>
    </div>
  );
}