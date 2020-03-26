const express = require('express');

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

module.exports = routes;
