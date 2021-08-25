import React, { useState, useEffect, useContext } from 'react';
import useJsonFetch from '../hooks/useJsonFetch.js'
import PostsContext from '../context/PostsContext.js';

export default function ChangePost(props) {
  const {match, history} = props;
  const { posts, setPosts, url } = useContext(PostsContext);
  const [value, setValue] = useState();
  const [zapros, setZapros, data, loading] = useJsonFetch();
  const id = Number(match.params.id);

  const handleChange = (evt) => {
    setValue(evt.target.value);
  }

  const handleClose = () => {
    history.goBack();
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setZapros({
      url: `${url}posts`,
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id,
        content: value,
      }),
    });
  };

  useEffect(() => {
    const itemPost = posts.find(o => o.id === id);
    setValue(itemPost.content);

    if (data) {
      setPosts(prevPost => prevPost.map((itemPost) => itemPost.id === id ? {...itemPost, content: value} : itemPost));
      history.goBack();
    }
  }, [data])

  return (
    <div className="change-post">
      <p>Редактировать публикацию</p>
      <div className="top">
        <span className="close" onClick={handleClose}>X</span>
      </div>
      <form onSubmit={handleSubmit}>
        <textarea name="text" onChange={handleChange} value={value} />
        <div className="submit">
          <button type="submit" className="button">Сохранить</button>
        </div>
      </form>
    </div>
  );
}