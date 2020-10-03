import React, { useEffect } from 'react';
import AdminPage from './views/AdminPage';
import LoginPage from './views/LoginPage';
import UserPage from './views/UserPage';
import routes from './routes';
import PrivateRoute from './views/router/PrivateRoute';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import setAuthToken from '../src/utils/setAuthToken';
import { loadUser } from './actions/auth';
import { Provider } from 'react-redux';
import store from './store/store';


if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, [])
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <PrivateRoute path="/">
            <AdminPage routes={routes} />
          </PrivateRoute>
          <Route path="/user" component={UserPage} />
        </Switch>
      </Router>
    </Provider>

  );
}



export default App;
