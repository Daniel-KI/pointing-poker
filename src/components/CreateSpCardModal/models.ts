export interface CreateSpCardModalProps {
  isActive: boolean;
  setActive: (value: boolean) => void;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  score?: string;
}
