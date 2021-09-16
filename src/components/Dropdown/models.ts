export interface DropdownProps {
  options: string[];
  selected: string | undefined;
  className?: string;
  setSelected: (value: string) => void;
}
