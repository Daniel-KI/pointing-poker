import PriorityLevel from '../../types/PriorityLevel';

export interface CreateIssueModalProps {
  isActive: boolean;
  setActive: (value: boolean) => void;
  onSubmit: (name: string, priority: PriorityLevel) => void;
}
