export interface UserCardProps {
  name: string;
  surname: string;
  jobPosition: string;
  avatar?: string;
  addAction?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  editAction?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  deleteAction?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
