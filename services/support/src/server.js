import initializeServer from '@app/server';
import config from './config';

initializeServer({
  service: 'Support service',
  database: true,
  config,
});
