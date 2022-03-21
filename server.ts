import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';

import { AppConfigService } from './src/app/providers/app-config.service'
import { Request, Response, NextFunction } from 'express';
import { PaginatedProductsList } from 'src/app/models/product.model';
import serverEnvConfig from 'server.env.config';



// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  console.log("server called")
  const server = express();
  const distFolder = join(process.cwd(), 'dist/globex-ui/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);


  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  
  //API Setup START
  // Example Express Rest API endpoints
  //const http = require('http');
  const axios = require('axios');
  server.get(serverEnvConfig.ANGULR_API_GETPAGINATEDPRODUCTS, (req, res) => {
    console.log("SSR:::: O/P from '/api/getPaginatedProducts' invoked from server.ts with req.params", req.query['page'] 
    + 'with URL as' + serverEnvConfig.CATALOG_GETPAGINATEDPRODUCTS_SERVICE + "?" + req.query['page']  + "&limit=" +req.query['limit'] )
    var getProducts:PaginatedProductsList;
    var myTimestamp = new Date().getTime().toString();
    var url = serverEnvConfig.CATALOG_GETPAGINATEDPRODUCTS_SERVICE.toString()+ "?page=" + req.query['page']  + "&limit=" +req.query['limit'] + "&timestamp=" + myTimestamp;
    console.log("URL called is: ", url);
    axios.get(url)
      .then(response => {
        getProducts =  response.data;;
        //console.log("SSR:::: O/P from '/api/getPaginatedProducts'",getProducts )
        res.send(getProducts);
      })
      .catch(error => {
        console.log(error);
      });
  });


  // Get Products
  server.get(serverEnvConfig.ANGULR_API_GETRECOMMENDEDPRODUCTS, (req, res) => {
    console.log('SSR::::  /api/getRecommendedProducts invoked');
    var getProducts= [];
    axios.get(serverEnvConfig.CATALOG_RECOMMENDED_PRODUCTS_SERVICE)
      .then(response => {
        getProducts =  response.data;;
        //console.log("SSR:::: O/P from '/api/getRecommendedProducts'",getProducts )
        res.send(getProducts);
      })
      .catch(error => {
        console.log(error);
      });
  });
  //API Setup END


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
 
  const port = process.env['PORT'] || 4000;
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
