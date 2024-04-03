import { verify } from 'jsonwebtoken';

import { NextFunction, Request, Response } from 'express';
import UsersTokensRepository from '../repositories/UsersTokensRepository';
import auth from '../../config/env';
import { parseCookie } from '../utils/parseCookie';

export default async function isAuthenticated(request: Request, response: Response, next: NextFunction) {
  const cookie = request.headers.cookie;

  if (!cookie) {
    return response.status(401).json({error: 'Token is missing' });
  }

  const authToken = parseCookie(cookie);

  if(!authToken) {
    return response.status(401).json({error: 'Token is missing' });
  }

  const {
    secret_token
  } = auth;

  try {
    const decodedToken = verify(authToken, secret_token) as { sub: string};

    const { sub: user_id } = decodedToken;

    if(user_id === undefined){
      return response.status(500).json({error: 'Something went wrong' });
    }

    const user = await UsersTokensRepository.findUserByUserIdAndToken(user_id, authToken);

    if(!user) {
      return response.status(401).json({error: 'You are not logged in, please sign in again!'});
    }

    request.body.user_id = user_id;


    next();
  } catch (error) {
    return response.status(500).json({error: 'Something went wrong' });
  }
}
