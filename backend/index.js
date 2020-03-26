const express = require('express');
const app = express();

app.use(express.json());
app.listen(3333);

app.post('/user', (request, response) => {
  const param = request.body;
  console.log(param);

  return response.send('Usuário criado com sucesso!');
});
