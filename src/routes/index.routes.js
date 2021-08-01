const { Router } = require('express');
const route = Router();

const { renderIndex, renderAbout } = require('../controllers/index.controller');

route.get('/', renderIndex);

route.get('/about', renderAbout);

module.exports = route;