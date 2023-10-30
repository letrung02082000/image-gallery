import React, { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import axios from 'axios';

function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const UNSPLASH_ROOT = 'https://api.unsplash.com';
  const ACCESS_KEY = 'EEy9TEITff21cWPi3mGxgbFWD1N7J6b-pG9pRGJXhDQ';
  const url = `${UNSPLASH_ROOT}/search/photos/?query=${query}&client_id=${ACCESS_KEY}&page=${page}`;

  const loadImage = async () => {
    const res = await axios.get(url);
    const data = await res.data;
    setImages([...images, ...data?.results]);

    if (data?.results?.length > 0) {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      loadImage();
    }, 1500);
  }, [query, page]);

  const handleQueryChange = (e) => {
    setImages([]);
    setPage(1);
    setQuery(e.target.value);
  };

  const handleScroll = (event) => {
    const target = event.target;
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      setLoading(true);
      setPage(page + 1);
    }
  };

  return (
    <div className='gallery' onScroll={handleScroll}>
      <div
        style={{
          marginBottom: '1rem',
          width: '80%',
        }}
      >
        <input
        style={{
          width: '100%',
        }}
          type='text'
          placeholder='Type here...'
          onChange={handleQueryChange}
        />
      </div>
      <div>
        {images.map((image) => {
          return (
            <div>
              <img
                key={image?.id}
                src={image.urls.thumb}
                alt={image.alt_description}
              />
            </div>
          );
        })}
      </div>
      {loading && <div>Loading...</div>}
    </div>
  );
}

export default App;
