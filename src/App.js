import React from 'react';
import Header from './common/Header';
import routes from './routes';
import { Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        {routes.map((route, i) => 
          <Route key={i} {...route} />
        )}
      </Switch>
    </>
  );
}

export default App; 