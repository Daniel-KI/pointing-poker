import dotenv from 'dotenv';

dotenv.config();

export const ENDPOINT = process.env.ENDPOINT || 'http://localhost:4000/';
export const URL = process.env.URL || 'http://localhost:3000/';
