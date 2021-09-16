export interface CreateIssueModalProps {
  className?: string;
  isActive: boolean;
  setActive: (value: boolean) => void;
  onConfirm: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onDecline?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
