import 'dotenv/config';
import { Request } from 'express';
import multer, { Options } from 'multer';
import crypto from 'crypto';
import path from 'path';
import multerS3 from 'multer-s3';
import env from './env';
import { S3Client, S3ClientConfig } from '@aws-sdk/client-s3';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp', 'uploads');
const allowedMimes = ['image/jpeg', 'image/jpeg', 'image/png', 'image/webp'];

interface StorageTypes {
  [key: string]: multer.StorageEngine;
}

const storageTypes: StorageTypes = {
  local: multer.diskStorage({
    destination: tmpFolder,
    filename: (request: Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) => {
      const fileHash = crypto.randomBytes(12).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;
      return callback(null, fileName);
    },
  }),
  s3: multerS3({
    s3: new S3Client({
      region: env.region,
      credentials: {
        accessKeyId: env.access_key,
        secretAccessKey: env.secret_access_key,
      },
    } as unknown as S3ClientConfig),
    bucket: env.bucket_name,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key(req: Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) {
      const fileHash = crypto.randomBytes(16).toString('hex');
      const filename = `${fileHash}-${file.originalname}`;
      return callback(null, filename);
    },
  }),
};

const multerConfig: Options = {
  dest: tmpFolder,
  storage: storageTypes[env.storageType],
  fileFilter: (req, file, callback) => {
    if (!allowedMimes.includes(file.mimetype)) {
      callback(null, false);
    } else {
      callback(null, true);
    }
  },
};

export default multerConfig;
