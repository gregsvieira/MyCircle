import { NextFunction, Request, Response } from 'express';
import { Socket } from 'socket.io';

export default (_socket: Socket, request: Request, response: Response, next: NextFunction) => {
  request.header('http://localhost:3000');
  request.header('GET, POST, PUT, DELETE');
  request.header('Content-Type, Authorization');
  request.header('true');
  next();
};
