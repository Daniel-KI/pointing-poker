export interface CreateIssueModalProps {
  isActive: boolean;
  setActive: (value: boolean) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onConfirm?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onDecline?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
}
