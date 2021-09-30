import { ENDPOINT } from './constants';

const validateConnection = async (id: string): Promise<string | undefined> => {
  try {
    const res = await fetch(`${ENDPOINT}auth/${id}`);
    await res.json();
    return '';
  } catch (error) {
    return 'No connection. Try again';
  }
};

export default validateConnection;
