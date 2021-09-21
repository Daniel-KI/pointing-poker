import dotenv from 'dotenv';

dotenv.config();

const validateURL = async (url: string): Promise<boolean> => {
  const ENDPOINT = process.env.ENDPOINT || 'http://localhost:4000/';
  const body = { url };
  const res = await fetch(`${ENDPOINT}auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const response = await res.json();
  return response;
};

export default validateURL;
