const express = require('express');
require('express-async-errors');

const routes = require('./routes');

const app = express();

const port = 3333;
app.use(express.json());
app.use(routes);

// Error Handler do Express
app.use((error, request, response, next) => {
  console.log(error);
  response.sendStatus(500);
});

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
