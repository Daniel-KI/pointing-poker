export interface CreateIssueModalProps {
  isActive: boolean;
  setActive: (value: boolean) => void;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}
