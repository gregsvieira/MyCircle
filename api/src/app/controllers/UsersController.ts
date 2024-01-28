import { Request, Response } from 'express';
import { hash , compare } from 'bcrypt';
import { sign/* , verify */ } from 'jsonwebtoken';
import UsersRepository from '../repositories/UsersRepository';
import UsersTokensRepository from '../repositories/UsersTokensRepository';
import auth from '../../config/auth';
import addDaysToCurrentDate from '../utils/addDaysToCurrentDate';
import RolesRepository from '../repositories/RolesRepository';
import ContactsRepository from '../repositories/ContactsRepository';

class UsersController {
  async signUp(request: Request, response: Response) {
    const {
      name,
      email,
      username,
      phone,
      password,
      role,
    } = request.body;
    const roleId = await RolesRepository.findRoleIdByName(role ?? 'regular_user');

    const contactIdWithSameEmail = await ContactsRepository.findByEmail(email);

    const usernameExists = await UsersRepository.findByUsername(username);
    const emailExists = await UsersRepository.findByEmail(email);

    if (usernameExists || emailExists) {
      return response.status(400).json({error: 'User already exist!'});
    }

    const passwordHashed = await hash(password, 8);

    const user = await UsersRepository.createUser({
      userId: contactIdWithSameEmail?.id,
      name,
      username,
      email,
      password: passwordHashed,
      phone,
      role_id: roleId.id,
      active: true
    });

    if (!user) {
      return response.status(400).json({error: 'Something went wrong, try again later!'});
    }

    return response.status(200).json({
      username,
      email,
    });

  }

  async signIn(request: Request, response: Response) {
    const { email, password } = request.body;
    const user = await UsersRepository.findByEmail(email);

    const {
      secret_token,
      expires_in_token,
      secret_refresh_token,
      expires_in_refresh_token
    } = auth;

    if (!user) {
      return response.status(401).json({
        error: 'Username or password incorrect!'
      });
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return response.status(401).json({
        error: 'Username or password incorrect!'
      });
    }

    const expiresDate = addDaysToCurrentDate(expires_in_token);

    if(!expiresDate) {
      return response.status(400).json({error: 'Something went wrong, try again later!'});
    }
    const accessToken = sign({ username: user.username }, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token
    });

    const refreshToken = sign({ username: user.username }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token
    });

    await UsersTokensRepository.deleteTokenByUserId(user.id);

    await UsersTokensRepository.createUserToken({
      access_token: accessToken,
      refresh_token: refreshToken,
      user_id: user.id,
      expires_date: expiresDate,
    });


    return response.cookie('auth', accessToken, {
      httpOnly: true,
      maxAge: 7 * 86400,
      path: '/'
    }).status(200).json({
      token: accessToken,
      refreshToken: refreshToken
    });
  }

  async signOut(request: Request, response: Response) {
    return response.clearCookie('auth').status(201);
  }


}

export default new UsersController();
