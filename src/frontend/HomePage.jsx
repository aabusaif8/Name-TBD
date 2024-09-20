import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './CSS/HomePage.css';

function HomePage() {
  const [mangaList, setMangaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMangaList = async () => {
      try {
        const response = await axios.get('https://api.mangadex.org/manga', {
          params: {
            limit: 30,  // Increased to show more manga
            order: { followedCount: 'desc' },
            includes: ['cover_art']
          }
        });
        setMangaList(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch manga list');
        setLoading(false);
        console.error(err);
      }
    };

    fetchMangaList();
  }, []);

  const getCoverImage = (manga) => {
    const coverRelationship = manga.relationships.find(rel => rel.type === 'cover_art');
    if (coverRelationship && coverRelationship.attributes) {
      const fileName = coverRelationship.attributes.fileName;
      return `https://uploads.mangadex.org/covers/${manga.id}/${fileName}.256.jpg`;
    }
    return 'path/to/placeholder-image.jpg'; // Replace with an actual placeholder image
  };

  if (loading) return <div className="container loading">Loading...</div>;
  if (error) return <div className="container error">Error: {error}</div>;

  return (
    <div className="container">
      <div className="manga-list">
        <h1>Popular Manga</h1>
        <div className="manga-grid">
          {mangaList.map((manga) => (
            <Link to={`/manga/${manga.id}`} key={manga.id} className="manga-card">
              <img 
                src={getCoverImage(manga)} 
                alt={manga.attributes.title.en} 
                onError={(e) => {e.target.onerror = null; e.target.src = 'path/to/placeholder-image.jpg'}}
              />
              <h3>{manga.attributes.title.en}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;