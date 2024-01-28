import { Request, Response } from 'express';

export default (error: Error, request: Request, response: Response) => {
  return response.status(500).json({error: 'Something went wrong on server' });
};
