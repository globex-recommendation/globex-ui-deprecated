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
import { AxiosError } from 'axios';



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
  const http = require('http');
  const bodyParser = require('body-parser');

  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({extended: true}) );
  

  //Get Paginated Products
  const axios = require('axios');
  server.get(serverEnvConfig.ANGULR_API_GETPAGINATEDPRODUCTS, (req, res) => {
    console.log("SSR:::: O/P from '/api/getPaginatedProducts' invoked from server.ts with req.params", req.query['page'] 
    + 'with URL as' + serverEnvConfig.API_GET_PAGINATED_PRODUCTS + "?" + req.query['page']  + "&limit=" +req.query['limit'] )
    var getProducts:PaginatedProductsList;
    var myTimestamp = new Date().getTime().toString();
    var url = serverEnvConfig.API_GET_PAGINATED_PRODUCTS.toString();
    var limit = req.query['limit'];
    var page = req.query['page'];

    console.log("URL called is: ", url);
    axios.get(url, {params: { limit: limit, timestamp:myTimestamp , page: page } })
      .then(response => {
        getProducts =  response.data;;
        //console.log("SSR:::: O/P from '/api/getPaginatedProducts'",getProducts )
        res.send(getProducts);
      })
      .catch(error => {
        console.log(error);
      });
  });


  // Get Product Details for the comma separated Product IDs string
  server.get(serverEnvConfig.ANGULR_API_GETRECOMMENDEDPRODUCTS, (req, res) => {
    //console.log('SSR:::: erEnvConfig.ANGULR_API_GETRECOMMENDEDPRODUCTS ' + serverEnvConfig.ANGULR_API_GETRECOMMENDEDPRODUCTS+ ' invoked');
    var commaSeparatedProdIds;
    var recommendedProducts= [];
    var url1 = serverEnvConfig.API_CATALOG_RECOMMENDED_PRODUCT_IDS;
    var url2 = serverEnvConfig.API_GET_PRODUCT_DETAILS_BY_IDS;
    var getRecommendedProducts;
    axios
      .get(url1)
      .then(response => {
        getRecommendedProducts =  response.data;
        //console.log("getRecommendedProducts ID", getRecommendedProducts )

        //get a list of Product Ids from the array sent
        var prodArray = getRecommendedProducts.map(s=>s.productId);
        commaSeparatedProdIds = prodArray.toString();
        //console.log("commaSeparatedProdIds", commaSeparatedProdIds);

        return axios.get(url2 + commaSeparatedProdIds);
      })
      .then(response => {
        //console.log("ANGULR_API_GETRECOMMENDEDPRODUCTS O/P", response.data);
        var prodDetailsArray = [];
        prodDetailsArray = response.data;


        const a3 = getRecommendedProducts.map(t1 => ({...t1, ...prodDetailsArray.find(t2 => t2.itemId === t1.productId)}))
        //console.log("getRecommendedProducts",a3)
        
        res.send(a3);
      }).catch(error => { console.log(error); });
  });
  
  
  // Get Product Details based on Product IDs
  server.get(serverEnvConfig.ANGULR_API_GETPRODUCTDETAILS_FOR_IDS, (req, res) => {
    //console.log('SSR:::: serverEnvConfig.ANGULR_API_GETPRODUCTDETAILS_FOR_IDS ' + serverEnvConfig.ANGULR_API_GETPRODUCTDETAILS_FOR_IDS+ ' invoked');
    var commaSeparatedProdIds =  req.query["productIds"]
    var url = serverEnvConfig.API_GET_PRODUCT_DETAILS_BY_IDS;
    axios
      .get(url + commaSeparatedProdIds)
      .then(response => {
        //console.log("serverEnvConfig.ANGULR_API_GETPRODUCTDETAILS_FOR_IDS for ids" + commaSeparatedProdIds, response.data); 
        res.send(response.data);
      })
      .catch(error => { console.log(error); });
  });

  
  // Save user activity
  
  server.post(serverEnvConfig.ANGULR_API_TRACKUSERACTIVITY, (req, res) => {
    console.log('SSR::::' + serverEnvConfig.ANGULR_API_TRACKUSERACTIVITY+ ' invoked');
    var userActivity  =  req.body;
    console.log("userActivity", userActivity)
    
    var url = serverEnvConfig.API_TRACK_USERACTIVITY;
    console.log("TRACKUSERACTIVITY url", url)
    axios
      .post(url, req.body)
      .then(response => {
        //console.log("ANGULR_API_TRACKUSERACTIVITY::DATA", response); 
        res.send(response.data);
      })
      .catch(
        (reason: AxiosError<{additionalInfo:string}>) => {
          if (reason.response!.status === 400) {
            // Handle 400
            res.send("error:reason.response!.status " + reason.response!.status);
          } else {
            res.send("error:reason.response!.status " + reason.response!.status);
          }
          console.log("ANGULR_API_TRACKUSERACTIVITY AxiosError", reason.message)
        }
      );
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
 
  const port = process.env['PORT'] || 4200;
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
