import React from 'react';
import Layout from '../components/Layout';
import LeagueMatchTable from '../components/LeagueMatchTable';

const PremierLeague: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center mb-6">
        <img
          src="https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Premier_League_Logo.svg/1200px-Premier_League_Logo.svg.png"
          alt="Premier League Logo"
          className="h-24 mb-4"
        />
        <h1 className="text-3xl font-bold">Premier League</h1>
      </div>
      <LeagueMatchTable leagueId={2021} /> 
    </Layout>
  );
};

export default PremierLeague;
