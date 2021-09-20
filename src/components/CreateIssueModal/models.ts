export interface CreateIssueModalProps {
  isActive: boolean;
  setActive: (value: boolean) => void;
  onConfirm: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onDecline?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
}
