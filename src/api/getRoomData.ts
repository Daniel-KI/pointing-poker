import { IRoom } from '../redux/models';
import { ENDPOINT } from './constants';

const getRoomData = async (id: string | undefined): Promise<IRoom | undefined> => {
  if (!id) {
    return undefined;
  }
  try {
    const res = await fetch(`${ENDPOINT}rooms/${id}`);
    const response = await res.json();
    return response;
  } catch (error) {
    return undefined;
  }
};

export default getRoomData;
