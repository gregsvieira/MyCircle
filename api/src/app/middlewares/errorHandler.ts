import { Request, Response } from 'express';

export default (error: Error, request: Request, response: Response) => {
  console.log(error);
  response.sendStatus(500);
};
