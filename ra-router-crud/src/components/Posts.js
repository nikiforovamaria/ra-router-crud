import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import useJsonFetch from '../hooks/useJsonFetch.js'
import PostsContext from '../context/PostsContext.js';

export default function Posts(props) {
  const { advanced, setAdvanced, url, posts, setPosts } = useContext(PostsContext);
  const [zapros, setZapros, data] = useJsonFetch();
  
  useEffect(() => {
    if (!data) {
      setZapros({
        url: `${url}posts`,
        method: 'GET',
      });
    }
    if (data) {
      setPosts(data.resolve);
    }
    
    
  }, [data])
  
  console.log(posts);

  return (
    <div>
      {/* {loading && 'loading...'} */}
      <div className="main-top">
        <Link to="/posts/new" className="button">Создать пост</Link>
      </div>
      
      {data && data.resolve.map((o) => <Link to={`/posts/${o.id}`}>
        <div  className="item-post" key={o.id}>
          <div className="item-post-header">
            <div className="item-post-img"></div>
            <div className="item-post-name">
              <span>Имя</span>
              <span>
                {moment(o.created).fromNow()}
              </span>
            </div>
          </div>
          <div className="item-post-content">
            <p>{o.content}</p>
          </div>
        </div>
      </Link>)}
    </div>
  );
}