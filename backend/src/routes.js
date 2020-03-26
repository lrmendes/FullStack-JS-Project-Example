const express = require('express');
const ongController = require('./controller/ongController');
const incController = require('./controller/incController');
const profileController = require('./controller/profileController');
const sessionController = require('./controller/sessionController');


const routes = express.Router();

routes.get('/ongs', ongController.index);
routes.post('/ongs', ongController.create);

routes.get('/incidents', incController.index);
routes.post('/incidents', incController.create);
routes.delete('/incidents/:id', incController.delete);

routes.get('/profile', profileController.index);

routes.post('/sessions', sessionController.create);

module.exports = routes;