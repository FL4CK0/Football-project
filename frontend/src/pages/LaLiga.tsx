import React from 'react';
import Layout from '../components/Layout';
import LeagueMatchTable from '../components/LeagueMatchTable';

const LaLiga: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center mb-6">
        <img
          src="https://logowik.com/content/uploads/images/laliga6363.logowik.com.webp"
          alt="La Liga Logo"
          className="h-24 mb-4"
        />
        <h1 className="text-3xl font-bold">La Liga</h1>
      </div>
      <LeagueMatchTable leagueId={2014} />
    </Layout>
  );
};

export default LaLiga;
