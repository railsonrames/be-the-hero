const express = require('express');

const OngController = require('../controllers/OngController');
const IncidentController = require('../controllers/IncidentController');
const SessionController = require('../controllers/SessionController');

const routes = express.Router();

routes.get('/ong', OngController.index);
routes.post('/ong', OngController.create);

routes.get('/incident', IncidentController.index);
routes.get('/incident/ong', IncidentController.byOng);
routes.post('/incident', IncidentController.create);
routes.delete('/incident/:id', IncidentController.delete);

routes.post('/session', SessionController.create);

module.exports = routes;
