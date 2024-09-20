import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import ChapterList from './ChapterList';
import './CSS/MangaReader.css';

function MangaReader() {
  const { mangaId } = useParams();
  const navigate = useNavigate();
  const [mangaData, setMangaData] = useState(null);
  const [chapterData, setChapterData] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showChapterList, setShowChapterList] = useState(true);

  useEffect(() => {
    const fetchMangaData = async () => {
      try {
        const response = await axios.get(`https://api.mangadex.org/manga/${mangaId}`);
        setMangaData(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch manga data');
        setLoading(false);
        console.error(err);
      }
    };

    fetchMangaData();
  }, [mangaId]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (chapterData) {
        if (event.key === 'ArrowLeft') {
          goToPreviousPage();
        } else if (event.key === 'ArrowRight') {
          goToNextPage();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [chapterData, currentPage]);

  const fetchChapterPages = async (chapterId) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://api.mangadex.org/at-home/server/${chapterId}`);
      setChapterData(response.data);
      setCurrentPage(0);
      setShowChapterList(false);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch chapter data');
      setLoading(false);
      console.error(err);
    }
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => (prev < chapterData.chapter.data.length - 1 ? prev + 1 : prev));
  };

  const returnToChapterList = () => {
    setShowChapterList(true);
    setChapterData(null);
  };

  const returnToHome = () => {
    navigate('/');
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!mangaData) return null;

  return (
    <div className="manga-reader">
      <header>
        <h1>{mangaData.attributes.title.en}</h1>
      </header>
      {showChapterList ? (
        <ChapterList mangaId={mangaId} onChapterSelect={fetchChapterPages} />
      ) : (
        chapterData && (
          <div className="reader-content">
            <div className="manga-page">
              <img 
                src={`${chapterData.baseUrl}/data/${chapterData.chapter.hash}/${chapterData.chapter.data[currentPage]}`} 
                alt={`Page ${currentPage + 1}`} 
              />
            </div>
            <div className="controls">
              <button onClick={goToPreviousPage} disabled={currentPage === 0}>
                Previous
              </button>
              <span>{`Page ${currentPage + 1} of ${chapterData.chapter.data.length}`}</span>
              <button onClick={goToNextPage} disabled={currentPage === chapterData.chapter.data.length - 1}>
                Next
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default MangaReader;