const express = require('express');
require('express-async-errors');

const cors = require('./app/middlewares/cors');
const routes = require('./routes');

const app = express();

const port = 3001;
app.use(express.json());
app.use(cors);

app.use(routes);

// Error Handler do Express
app.use((error, request, response, next) => {
  console.log(error);
  response.sendStatus(500);
});

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
