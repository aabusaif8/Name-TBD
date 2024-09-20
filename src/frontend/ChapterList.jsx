import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ChapterList({ mangaId, onChapterSelect }) {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await axios.get(`https://api.mangadex.org/manga/${mangaId}/feed`, {
          params: {
            translatedLanguage: ['en'],
            order: { chapter: 'desc' },
            limit: 100, // Adjust as needed
          }
        });
        setChapters(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch chapters');
        setLoading(false);
        console.error(err);
      }
    };

    fetchChapters();
  }, [mangaId]);

  if (loading) return <div>Loading chapters...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="chapter-list">
      <h2>Chapters</h2>
      <ul>
        {chapters.map((chapter) => (
          <li key={chapter.id}>
            <button onClick={() => onChapterSelect(chapter.id)}>
              Chapter {chapter.attributes.chapter}: {chapter.attributes.title || 'Untitled'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChapterList;