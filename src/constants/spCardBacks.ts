import CardBack1 from '../assets/cardBack/card-back-1.svg';
import CardBack2 from '../assets/cardBack/card-back-2.svg';
import CardBack3 from '../assets/cardBack/card-back-3.svg';
import CardBack4 from '../assets/cardBack/card-back-4.svg';
import CardBack5 from '../assets/cardBack/card-back-5.svg';
import SpCardBackType from '../types/SpCardBackType';

export interface ISpCardBack {
  type: SpCardBackType;
  image: string;
}

const spCardBacks: ISpCardBack[] = [
  {
    type: 'type1',
    image: CardBack1,
  },
  {
    type: 'type2',
    image: CardBack2,
  },
  {
    type: 'type3',
    image: CardBack3,
  },
  {
    type: 'type4',
    image: CardBack4,
  },
  {
    type: 'type5',
    image: CardBack5,
  },
];

export default spCardBacks;
