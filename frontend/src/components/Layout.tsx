import React from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div>
    <div className="homepage">
      <Link to="/">Football Stats</Link>
    </div>
    <div className="header">
      <Link to="/laliga">La Liga</Link>
      <Link to="/premierleague">Premier League</Link>
      <Link to="/seriea">Serie A</Link>
      <Link to="/bundesliga">Bundesliga</Link>
      <Link to="/ligue1">Ligue 1</Link>
    </div>
    {children}
  </div>
);

export default Layout;
