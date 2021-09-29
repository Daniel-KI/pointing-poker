import { ENDPOINT, BASE_URL } from './constants';

const validateURL = async (link: string): Promise<string | undefined> => {
  const name = link.replace(/^https?:\/\//i, '');
  if (!name.startsWith(BASE_URL.replace(/^https?:\/\//i, ''))) {
    return undefined;
  }

  const id = link.slice(link.lastIndexOf('/') + 1);
  try {
    const res = await fetch(`${ENDPOINT}auth/${id}`);
    const response = await res.json();
    return response;
  } catch (error) {
    return undefined;
  }
};

export default validateURL;
