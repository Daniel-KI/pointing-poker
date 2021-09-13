export interface DropdownProps {
  options: string[];
  selected: string | undefined;
  setSelected: (value: string) => void;
}
