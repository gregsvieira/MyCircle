import dotenv from 'dotenv';
dotenv.config();

interface AuthConfig {
  storageType: string;
  region: string;
  access_key: string;
  secret_access_key: string;
  bucket_name:string;
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
  storageType: process.env.STORAGE_TYPE,
  region: process.env.AWS_REGION,
  access_key: process.env.AWS_ACCESS_KEY_ID,
  secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
  bucket_name: process.env.BUCKET_NAME,
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
