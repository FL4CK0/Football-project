import React from 'react';
import Layout from '../components/Layout';
import LeagueMatchTable from '../components/LeagueMatchTable';

const Bundesliga: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center mb-6">
        <img
          src="https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Bundesliga_logo_%282017%29.svg/800px-Bundesliga_logo_%282017%29.svg.png"
          alt="Bundesliga Logo"
          className="h-24 mb-4"
        />
        <h1 className="text-3xl font-bold">Bundesliga</h1>
      </div>
      <LeagueMatchTable leagueId={2002} />
    </Layout>
  );
};

export default Bundesliga;
