import React, { useState } from 'react';
import { Button, Paper, CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import MenuAppBar from '../../components/MenuAppBar';
import firebase from '../../firebase';

const LoginOptions: React.FC = () => {
  return (
    <React.Fragment>
      <p>
        Login with google to do stuff.
      </p>
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        onClick={() => firebase.signInWithGoogle()}
      >
        Login with Google
      </Button>
    </React.Fragment>
  )
}

const Login: React.FC = () => {
  const history = useHistory();
  const [checkingForRedirect, setCheckingForRedirect] = useState(true);

  firebase.getUserIfLoggedInFromRedirect().then(
    // TODO: Lag here before redirect is not ideal... Need to consider
    (user: firebase.User | null) => {
      if (user) {
        history.replace('/click-increment');
      }
      setCheckingForRedirect(false);
    },
  );

  if (firebase.isLoggedIn()) {
    history.replace('/click-increment');
    return (null);
  } // TODO: sort this in react router, users shouldn't see this page

  let content: React.ReactNode;
  if (checkingForRedirect) {
    content = <CircularProgress />;
  } else {
    content = <LoginOptions />;
  }

  return (
    <div>
      <MenuAppBar pageName="Login" />
      {content}
    </div>
  );
};

export default Login;
