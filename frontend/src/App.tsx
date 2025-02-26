import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Bundesliga from './pages/Bundesliga';
import LaLiga from './pages/LaLiga';
import PremierLeague from './pages/PremierLeague';
import SerieA from './pages/SerieA';
import Ligue1 from './pages/Ligue1';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bundesliga" element={<Bundesliga />} />
        <Route path="/laliga" element={<LaLiga />} />
        <Route path="/premierleague" element={<PremierLeague />} />
        <Route path="/seriea" element={<SerieA />} />
        <Route path="/ligue1" element={<Ligue1 />} />
      </Routes>
    </Router>
  );
};

export default App;
