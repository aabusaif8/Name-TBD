import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './frontend/NavBar';
import HomePage from './frontend/HomePage';
import MangaReader from './frontend/MangaReader';
import './frontend/CSS/App.css';
function App() {
  return (
    <Router>
      <div className="app-container">
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/manga/:mangaId" element={<MangaReader />} />
            {/* Add more routes as needed */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;