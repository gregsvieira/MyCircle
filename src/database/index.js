const { Client } = require('pg');
const auth = require('../config/auth')

const client = new Client({
  host: auth.host,
  port: auth.port,
  user: auth.user,
  password: auth.password,
  database: auth.database,
});

client.connect(() => {
  console.log('Connected on database');
});

exports.query = async (query, values) => {
  const { rows } = await client.query(query, values);
  return rows;
};
