
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
  ANGULR_API_GETPRODUCTDETAILS_FOR_IDS: '/api/getProductDetailsForIds',
  
  
  NODE_ENV: get('NODE_ENV').default('dev').asEnum(['dev', 'prod']),
  LOG_LEVEL: get('LOG_LEVEL').asString(),

  // HTTP and WebSocket traffic both use this port
  PORT: get('PORT').default(4200).asPortNumber(),


  // external micro services typically running on OpenShift
  API_MANAGEMENT_FLAG: get('API_MANAGEMENT_FLAG').asString(),
  
  API_TRACK_USERACTIVITY: get('API_TRACK_USERACTIVITY').default('https://activity-tracking-mock-globex-recommendation.apps.appservices.8d2l.s1.devshift.org/track').asString(),
  
  API_GET_PAGINATED_PRODUCTS: get('API_GET_PAGINATED_PRODUCTS').default('https://catalog-globex.apps.appservices.8d2l.s1.devshift.org:443/services/products').asString(),
  
  API_GET_PRODUCT_DETAILS_BY_IDS: get('API_GET_PRODUCT_DETAILS_BY_IDS').default('https://catalog-globex.apps.appservices.8d2l.s1.devshift.org/services/product/list/').asString(),
  
  API_CATALOG_RECOMMENDED_PRODUCT_IDS: get('API_CATALOG_RECOMMENDED_PRODUCT_IDS').default('https://microcks-microcks.apps.appservices.8d2l.s1.devshift.org/rest/Recommendation+API/1.0.0/score/product').asString(),
  
  API_USER_KEY_NAME: get('USER_KEY').default('api_key').asString(),
  API_USER_KEY_VALUE: get('API_USER_KEY_VALUE').default('8efad5cc78ecbbb7dbb8d06b04596aeb').asString()
  
};

export default envServerConfig;
