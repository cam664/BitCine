
import path from 'path';
import fs from 'fs';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider as ReduxProvider} from 'react-redux';
import { StaticRouter, matchPath } from 'react-router-dom';

import createStore from '../src/services/createStore';
import App from '../src/App';
import manifest from '../build/asset-manifest.json';

// LOADER
export default (req, res) => {
  const injectHTML = (data, { body, scripts, state }) => {
    data = data.replace(/<title>.*?<\/title>/g, '<title>Cameron Laing - for BitCine</title>');
    data = data.replace(
      '<div id="root"></div>',
      `<div id="root">${body}</div><script>window.__PRELOADED_STATE__ = ${state}</script>${scripts.join('')}`
    );

    return data;
  };

  // Load in our HTML file from our build
  fs.readFile(
    path.resolve(__dirname, '../build/index.html'),
    'utf8',
    (err, htmlData) => {
      if (err) {
        console.error('Read error', err);
        return res.status(404).end();
      }

      const store = createStore();
      const context = {};
      const modules = [];

      const routeMarkup = renderToString(
        <ReduxProvider store={store}>
          <StaticRouter context={context} location={req.url}>
            <App />
          </StaticRouter>
        </ReduxProvider>
      );

      const extractAssets = (assets, chunks) =>
        Object.keys(assets)
          .filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
          .map(k => assets[k]);

      const extraChunks = extractAssets(manifest, modules).map(
        c => `<script type="text/javascript" src="/${c.replace(/^\//, '')}"></script>`
      );

      const html = injectHTML(htmlData, {
        body: routeMarkup,
        scripts: extraChunks,
        state: JSON.stringify(store.getState()).replace(/</g, '\\u003c')
      });

      res.send(html);
    });
  }