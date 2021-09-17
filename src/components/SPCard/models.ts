import CardType from '../../types/CardType';

export interface SPCardProps {
  className?: string;
  onConfirm?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onDecline?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  scoreType?: string | undefined;
  cardScore?: string;
  cardType?: CardType | undefined;
}
