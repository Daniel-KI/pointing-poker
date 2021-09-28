import dotenv from 'dotenv';

dotenv.config();

export const ENDPOINT = process.env.ENDPOINT || 'https://pointing-poker-back.herokuapp.com/';
export const URL = process.env.URL || 'http://localhost:3000/';
