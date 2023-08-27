const { Client } = require('pg');
const auth = require('../config/auth');

const {
  host, port, user, password, database,
} = auth;

const client = new Client({
  host,
  port,
  user,
  password,
  database,
});

client.connect()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

exports.query = async (query, values) => {
  const { rows } = await client.query(query, values);
  return rows;
};
