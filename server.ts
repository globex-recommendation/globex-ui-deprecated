import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';

import { Request, Response, NextFunction } from 'express';


// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/globex-ui/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';


  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  //const http = require('http');
  const axios = require('axios');

  // Get Products
  const product_url = 'http://localhost:8081/services/products'
  server.get('/api/getProducts', (req, res) => {
    console.log("getProducts")
    var getProducts= [];
    axios.get(product_url)
      .then(response => {
        getProducts =  response.data;;
        console.log("SSR:::: O/P from '/api/getProducts'",getProducts )
        res.send(getProducts);
      })
      .catch(error => {
        console.log(error);
      });
  });

  // Get Products
  const recommend_product_url = 'http://localhost:8081/services/products'
  server.get('/api/getReccoProducts', (req, res) => {
    console.log("getProducts")
    var getProducts= [];
    axios.get(recommend_product_url)
      .then(response => {
        getProducts =  response.data;;
        console.log("SSR:::: O/P from '/api/getProducts'",getProducts )
        res.send(getProducts);
      })
      .catch(error => {
        console.log(error);
      });
  });

  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return server;
}

function run(): void {
 
  var port = process.env['PORT'] || process.env['OPENSHIFT_NODEJS_PORT'] || 8080,
    ip = process.env['IP'] || process.env['OPENSHIFT_NODEJS_IP'] || '0.0.0.0',
    secport = process.env['PORT'] || process.env['OPENSHIFT_NODEJS_PORT'] || 8443;


  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
