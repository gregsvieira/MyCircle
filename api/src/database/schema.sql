-- CREATE DATABASE mycontacts;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS status (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS categories (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS roles (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  email VARCHAR NOT NULL UNIQUE,
  username VARCHAR NOT NULL UNIQUE,
  phone VARCHAR UNIQUE,
  password VARCHAR NOT NULL,
  active BOOLEAN DEFAULT true NOT NULL,
  role_id UUID NOT NULL,
  FOREIGN KEY(role_id) REFERENCES roles(id)
);

CREATE TABLE IF NOT EXISTS users_tokens (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  access_token VARCHAR NOT NULL,
  refresh_token VARCHAR NOT NULL,
  expires_date DATE NOT NULL,
  user_id UUID NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS contacts (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  phone VARCHAR,
  active BOOLEAN DEFAULT false,
  category_id UUID,
  status_id UUID,
  user_id UUID,
  FOREIGN KEY(category_id) REFERENCES categories(id),
  FOREIGN KEY(status_id) REFERENCES status(id),
  FOREIGN KEY(user_id) REFERENCES users(id)
);

ALTER TABLE contacts
ADD CONSTRAINT unique_name_email UNIQUE (name, email);
