import React, { useEffect, useState } from 'react';
import { Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import MenuAppBar from '../../components/MenuAppBar';
import { database, functions } from '../../firebase';

const Home: React.FC = () => {
  const [count, setComponentCount] = useState(-1);
  const [helloWorldResponse, setHelloWorldResponse] = useState('');

  useEffect(() => {
    // Add a listener with setCount as the callback
    database.fetchAndListenToCounter(setComponentCount);
  }, []);

  useEffect(() => {
    functions.callHelloWorldFunction().then((text) => setHelloWorldResponse(text));
  }, []);

  return (
    <div>
      <MenuAppBar pageName="Home" />
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

      {helloWorldResponse && <p>
        Random function call says "{helloWorldResponse}"

        Weirdly I think it want's notifications in order to do that, which is odd as it's a http call.
        Will worry about if I need that in prod (and don't just use a http call)
      </p>}
    </div>
  )
};

export default Home;
