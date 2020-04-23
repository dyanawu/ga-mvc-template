// postgres module and connection pool config
// change the db name!
const { Pool } = require('pg');
const url = require('url');

var configs;

if (process.env.DATABASE_URL) {
  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.auth.split(':');

  configs = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true
  };
} else {
  configs = {
    user: 'dwu',
    host: '127.0.0.1',
    database: 'test_db',
    port: 5432
  };
}

const pool = new Pool(configs);

pool.on('error', function (err) {
  console.log('client pool error', err.message, err.stack);
});

// exports (variables don't need :
// cos they magically become `varname: varvalue`)
// query interface
// pool object so main app can close it
// model objects with pool passed to them
module.exports = pool;
