import  config from "server.env.config";



/* import pino from 'pino';
import { LOG_LEVEL, NODE_ENV } from './config';

 */
const level = config.LOG_LEVEL ? config.LOG_LEVEL : config.NODE_ENV === 'prod' ? 'info' : 'debug';

const log = {
  level
};

export default log;
