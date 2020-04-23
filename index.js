// express app
const express = require('express');
const app = express();

// middleware
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

// model
// contains database config
const pool = require('./db');

// require in routers
const routes = require('./routes/routes.js');

// use routers in order
app.use('/', routes);

// start server listen
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));

let shutdown = function(){
  server.close(() => {
    console.log('Process terminated');
    pool.end( () => console.log('Shut down db connection pool'));
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
