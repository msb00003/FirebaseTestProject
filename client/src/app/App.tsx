import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import PropTypes, { InferProps } from 'prop-types';
import Home from '../pages/Home';
import ClickIncrement from '../pages/ClickIncrement'; import Login from '../pages/Login';
import firebase from '../firebase';


export function Article({
  title,
  price,
}: InferProps<typeof Article.propTypes>) {
  return (
    <div className="article">
      <h1>{title}</h1>
      <span>
Priced at (incl VAT):
        {price * 1.2}
      </span>
    </div>
  );
}

Article.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

interface PrivateRouteProps extends React.Props<any> {
  exact: boolean,
  children: React.ReactNode,
  path: string,
}

const PrivateRoute = ({
  exact, path, children,
}: PrivateRouteProps) => (
  <Route
    exact={exact}
    path={path}
    render={({ location }) => (firebase.isLoggedIn() ? (
      children
    ) : (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: location },
        }}
      />
    ))}
  />
);

const App: React.FC = () => (
  <div>
    <CssBaseline />
    {/* So this is neat */}

    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/click-increment">
          <ClickIncrement />
        </PrivateRoute>
      </Switch>
    </Router>
  </div>
);

export default App;
