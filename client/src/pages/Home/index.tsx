import React, { useEffect, useState } from 'react';
import { Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import MenuAppBar from '../../components/MenuAppBar';
import { database } from '../../firebase';

const Home: React.FC = () => {
  const [count, setComponentCount] = useState(-1);

  useEffect(() => {
    // Add a listener with setCount as the callback
    database.fetchAndListenToCounter(setComponentCount);
  }, []);

  return (
    <div>
      <MenuAppBar />
      <Typography variant="h3">
          Logged in users have clicked: {count} times
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
  )
};

export default Home;
