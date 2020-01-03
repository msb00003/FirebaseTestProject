import React from 'react';
import { Button, Paper } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import MenuAppBar from '../../components/MenuAppBar';
import firebase from '../../firebase';

const Login: React.FC = () => {
  const history = useHistory();
  firebase.getUserIfLoggedInFromRedirect().then(
    // TODO: Lag here before redirect is not ideal... Need to consider
    (user: firebase.User|null) => {
      if (user) {
        history.replace('/click-increment');
      }
    },
  );

  return (
    <div>
      <MenuAppBar />
      <Paper elevation={3}>
        asd
      </Paper>
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        onClick={() => firebase.signInWithGoogle()}
      >
        Login with Google
      </Button>
    </div>
  );
};

export default Login;
