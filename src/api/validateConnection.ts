import { ENDPOINT } from './constants';

const validateConnection = async (id: string): Promise<string | undefined> => {
  try {
    const res = await fetch(`${ENDPOINT}auth/${id}`);
    const response = await res.json();
    return response;
  } catch (error) {
    return 'No connection. Try again';
  }
};

export default validateConnection;
