import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import MenuAppBar from '../../components/MenuAppBar';

const Home: React.FC = () => (
  <div>
    <MenuAppBar />
    <Typography variant="h3">
        Logged in users have clicked: $x times
    </Typography>
    <Button
      type="submit"
      variant="contained"
      color="secondary"
      component={Link}
      to="/login"
    >
        Login
    </Button>
  </div>
);

export default Home;
