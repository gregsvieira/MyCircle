import dotenv from 'dotenv';
dotenv.config();

interface AuthConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

export default {
    host: process.env.HOST,
    port: Number(process.env.PORT),
    user: process.env.USERDB,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
} as AuthConfig;
