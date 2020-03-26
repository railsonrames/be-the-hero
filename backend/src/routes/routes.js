const express = require('express');

const OngController = require('../controllers/OngController');
const IncidentController = require('../controllers/IncidentController');

const routes = express.Router();

routes.get('/user', (request, response) => {
  return response.send('Hello, world!');
});

routes.get('/user/:id', (request, response) => {
  const param = request.params;
  console.log(param);
  return response.json({
    texto: 'Hello, world!',
    event: 'Omnistack Week #11',
    student: 'Railson Rames'
  });
});

routes.post('/user', (request, response) => {
  const param = request.body;
  console.log(param);
  return response.send('User added successfully.');
});

routes.get('/ong', OngController.index);
routes.post('/ong', OngController.create);

routes.get('/incident', IncidentController.index);
routes.post('/incident', IncidentController.create);
routes.delete('/incident/:id', IncidentController.delete);

module.exports = routes;
