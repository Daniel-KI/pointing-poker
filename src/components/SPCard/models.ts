import CardType from '../../types/CardType';

export interface SPCardProps {
  className?: string;
  id?: string;
  editAction?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  deleteAction?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  scoreType?: string | undefined;
  cardScore?: string;
  cardType?: CardType | undefined;
}
