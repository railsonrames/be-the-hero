const express = require("express");
const app = express();

app.listen(3333);

app.get("/", (request, response) => {
  return response.json({
    message: "Hello, world!",
    event: "Omnistack Week 11",
    aluno: "Railson Rames"
  });
});
