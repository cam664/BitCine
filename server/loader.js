
import path from 'path';
import fs from 'fs';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider as ReduxProvider} from 'react-redux';
import { StaticRouter, matchPath } from 'react-router-dom';
import serialize from 'serialize-javascript';

import createStore from '../src/services/createStore';
import App from '../src/App';
import manifest from '../build/asset-manifest.json';
import routes from '../src/routes';

// LOADER
export default (req, res) => {
  // Helper to format response
  const injectHTML = (data, { title, body, scripts, state }) => {
    data = data.replace(/<title>.*?<\/title>/g, `<title>${title}</title>`);
    data = data.replace(
      /<div id="root">.*?<\/div>/,
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

      // Send a loading spinner immediately while waiting to populate Redux store
      res.write('<html><img id="loading-spinner" style="position:fixed; top:50%; left:50%; transform:translate(-50%,-50%);" src="/spinner.gif" /></html>')

      const store = createStore();
      const context = {};
      const modules = [];

      // Find route top level component and search it and it's children for
      // external API calls and call them here the pre-populate the redux store on server
      let dataReqs = [];

      const routeComponents = routes
        .filter(route => matchPath(req.url, route))
        .map(route => route.component)

      routeComponents.forEach(comp => {
        if (comp.serverFetch) {
          dataReqs.push(comp.serverFetch);
        }

        let queue = comp().props.children;
        if (!Array.isArray(queue)) {
          queue = [queue];
        }

        breadthFirstRecursive(queue, (comp) => {
          if (comp.type.serverFetch) {
            dataReqs.push(store.dispatch(comp.type.serverFetch()));
          }
        });
      });

      function breadthFirstRecursive(queue, callback) {
        if (queue.length === 0 || !Array.isArray(queue)){
          return;
        }

        var node = queue.shift();
        callback(node);

        if(Array.isArray(node.props.children)) {
          for(var i = 0 ; i < node.props.children.length; i++){
            var child = node.props.children[i];
            queue.push(child);
          }
        } else if (node.props.children && typeof node.props.children.type === 'function') {
          var child = node.props.children;
          queue.push(child);
        }
        breadthFirstRecursive(queue, callback);
      }

      let routeMarkup = null;
      Promise.all(dataReqs).then(() => {
        routeMarkup = renderToString(
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
          title: 'Cameron Laing - for BitCine',
          body: routeMarkup,
          scripts: extraChunks,
          state: serialize(store.getState()).replace(/</g, '\\u003c')
        });

        res.write(html);
        res.end();
      });
    });
  }