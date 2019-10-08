import React, { useEffect } from 'react';
import Header from './common/Header';
import routes from './routes';
import { Switch, Route } from 'react-router-dom';

import { Global, css } from '@emotion/core';

const App = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const spinner = document.getElementById('loading-spinner');
      if (spinner) {
        document.getElementById('loading-spinner').style.display = 'none';
      }
    }
  }, [])

  return (
    <>
      <Global
        styles={css`
          body {
            background-color: #f2f3f3;
            padding: 0;
            margin: 0;
            font-family: 'Lato', sans-serif;
            box-sizing: border-box;
          }
        `}
      />
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