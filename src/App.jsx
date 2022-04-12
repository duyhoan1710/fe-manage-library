import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from 'react-router-dom';
import { createBrowserHistory } from 'history';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import routes from 'routes';
import { GlobalProvider } from 'context/Provider';
import isAuthenticated from 'utils/isAuthenticated';

export const history = createBrowserHistory();

const RenderRoute = (route) => {
  const history = useHistory();

  if (route.needsAuth && !isAuthenticated()) {
    history.push('/auth/login');
  }
  return (
    <Route
      path={route.path}
      exact
      render={(props) => <route.component {...props} />}
    ></Route>
  );
};

function App() {
  return (
    <GlobalProvider>
      <Router history={history}>
        <Suspense fallback={<p>Loading</p>}>
          <Switch>
            {routes.map((route, index) => (
              <RenderRoute {...route} key={index} />
            ))}
          </Switch>
        </Suspense>
      </Router>
    </GlobalProvider>
  );
}

export default App;
