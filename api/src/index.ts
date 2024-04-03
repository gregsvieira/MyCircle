import express, { json } from 'express';

import { Server } from 'socket.io';
import { createServer } from 'http';
import compression from 'compression';

import 'express-async-errors';

import cors from './app/middlewares/cors';
// import socketCors from './app/middlewares/socketCors';
import errorHandler from './app/middlewares/errorHandler';
import routes from './routes';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
    allowedHeaders: '*',
    methods: ['GET', 'POST']
  }
});

const port = 3001;
app.use(compression());
app.use(json());
app.use(cors);
// io.engine.use(socketCors);
app.use(routes);

io.on('connection', (socket) => {
  console.log('user connected');
  socket.broadcast.emit('welcome', `Welcome, your ID is ${socket.id}`);
});

app.use(errorHandler);

server.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
