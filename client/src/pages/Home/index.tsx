import React from 'react';
import MenuAppBar from '../../components/MenuAppBar';
import { Typography } from '@material-ui/core';

const Home: React.FC = () => {
  return (
    <div>
      <MenuAppBar />
      <Typography variant="h3">
        Logged in users have clicked: $x times
      </Typography>
    </div>
  );
}

export default Home;
