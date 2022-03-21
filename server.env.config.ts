
import { get } from 'env-var';
//import { join } from 'path'


const envServerConfig = {

  
  // Location of Angular build and other files. Defaults to the dist/
  // in the root of the project
  //STATIC_DIR: get('STATIC_DIR').default(join(__dirname, '../dist/globex-ui')).asString(),

  ANGULR_API_GETPAGINATEDPRODUCTS: '/api/getPaginatedProducts',
  ANGULR_API_GETPAGINATEDPRODUCTS_LIMIT: 8,
  ANGULR_API_GETRECOMMENDEDPRODUCTS: '/api/getRecommendedProducts',
  ANGULR_API_TRACKUSERACTIVITY: '/api/trackUserActivity',
  
  
  NODE_ENV: get('NODE_ENV').default('dev').asEnum(['dev', 'prod']),
  LOG_LEVEL: get('LOG_LEVEL').asString(),

  // HTTP and WebSocket traffic both use this port
  HTTP_PORT: get('HTTP_PORT').default(8080).asPortNumber(),


  // external micro services typically running on OpenShift
  TRACK_USERACTIVITY_SERVICE: get('USERACTIVITY_TRACK_SERVICE').default('http://localhost:8083/service/userActivity/track').asString(),
  PRODUCT_SCORE_SERVICE: get('PRODUCT_SCORE_SERVICE').default('https://a19a3794-9518-499c-8edb-2fd67ec7511f.mock.pstmn.io/service/getPaginatedProducts').asString(),
  CATALOG_GETPAGINATEDPRODUCTS_SERVICE: get('CATALOG_GETPAGINATEDPRODUCTS_SERVICE').default('https://a19a3794-9518-499c-8edb-2fd67ec7511f.mock.pstmn.io/service/getPaginatedProducts').asString(),
  CATALOG_PRODUCTSBYIDS_SERVICE: get('CATALOG_PRODUCTSBYIDS_SERVICE').default('https://a19a3794-9518-499c-8edb-2fd67ec7511f.mock.pstmn.io/service/getPaginatedProducts').asString(),
  CATALOG_RECOMMENDED_PRODUCTS_SERVICE: get('RECOMMENDED_PRODUCTS_SERVICE').default('http://localhost:8081/services/products').asString(),
  
};

export default envServerConfig;
