const express = require('express');

const routes = require('./routes');

const app = express();
app.use(routes);

const port = 3333;

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
