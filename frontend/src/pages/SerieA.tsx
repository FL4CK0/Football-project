import React from 'react';
import Layout from '../components/Layout';
import LeagueMatchTable from '../components/LeagueMatchTable';

const SerieA: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center mb-6">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNbnCGdtHO203OHmuKsyCZlYP1d2FXNi_19Q&s"
          alt="Serie A Logo"
          className="h-24 mb-4"
        />
        <h1 className="text-3xl font-bold">Serie A</h1>
      </div>
      <LeagueMatchTable leagueId={2019} />
    </Layout>
  );
};

export default SerieA;
