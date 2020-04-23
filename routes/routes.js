const express = require('express');
const router = express.Router();

// require the controllers which have  a functon for each route
const controller = require('../controllers/generic_c');

router.get('/', controller.index);

module.exports = router;
