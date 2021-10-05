import dotenv from 'dotenv';

dotenv.config();

export const ENDPOINT = process.env.ENDPOINT || 'https://pointing-poker-back.herokuapp.com/';
export const BASE_URL = process.env.BASE_URL || 'http://localhost:3000/';
