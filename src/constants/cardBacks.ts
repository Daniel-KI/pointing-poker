import CardBack1 from '../../assets/cardBack/card-back-1.svg';
import CardBack2 from '../../assets/cardBack/card-back-2.svg';
import CardBack3 from '../../assets/cardBack/card-back-3.svg';
import CardBack4 from '../../assets/cardBack/card-back-4.svg';
import CardBack5 from '../../assets/cardBack/card-back-5.svg';


interface cardBack {
  name: string;
  image: string;
}

const cardBacks = {
  type1: {
    name: 'type 1',
    image: CardBack1,
  },
  type2: {
    name: 'type 2',
    image: CardBack2,
  },
  type3: {
    name: 'type 3',
    image: CardBack3,
  },
  type4: {
    name: 'type 4',
    image: CardBack4,
  },
  type5: {
    name: 'type 5',
    image: CardBack5,
  },
}
