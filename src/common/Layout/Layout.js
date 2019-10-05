import React from 'react';
import Header from '../Header';
import routes from '../../routes';
import { Switch, Route } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <Header />
      <Switch>
        {routes.map(route => 
          <Route {...route} />
        )}
      </Switch>
    </>
  );
}