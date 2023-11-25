import { Client, QueryResult } from 'pg';
import auth from '../config/auth';

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


export const query = async (query: string, values?: unknown[]): Promise<unknown[]> => {
    const { rows }: QueryResult = await client.query(query, values);
    return rows;
};
