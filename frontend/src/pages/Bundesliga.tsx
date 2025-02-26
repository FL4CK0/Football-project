import React from 'react';
import Layout from '../components/Layout';

const Bundesliga: React.FC = () => {
  return (
    <Layout>
      <img
        src="https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Bundesliga_logo_%282017%29.svg/800px-Bundesliga_logo_%282017%29.svg.png"
        alt="Bundesliga Logo"
        className="center"
      />
    </Layout>
  );
};

export default Bundesliga;
