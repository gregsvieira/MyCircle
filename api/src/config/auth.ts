import dotenv from 'dotenv';
dotenv.config();

interface AuthConfig {
  secret: string;
  token_duration: string;
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  secret_token: string;
  expires_in_token: string;
  secret_refresh_token: string;
  expires_in_refresh_token: string;
}

export default {
  host: process.env.HOST,
  port: Number(process.env.PORT),
  user: process.env.USERDB,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  secret_token: process.env.SECRET_TOKEN,
  expires_in_token: process.env.EXPIRES_IN_TOKEN,
  secret_refresh_token: process.env.SECRET_REFRESH_TOKEN,
  expires_in_refresh_token: process.env.EXPIRES_IN_REFRESH_TOKEN,
} as AuthConfig;
