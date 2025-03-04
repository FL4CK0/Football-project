import React from 'react';
import Layout from '../components/Layout';
import LeagueMatchTable from '../components/LeagueMatchTable';

const Ligue1: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center mb-6">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/f/fb/Ligue1_logo.png"
          alt="Ligue 1 Logo"
          className="h-24 mb-4"
        />
        <h1 className="text-3xl font-bold">Ligue 1</h1>
      </div>
      <LeagueMatchTable leagueId={2015} />
    </Layout>
  );
};

export default Ligue1;
