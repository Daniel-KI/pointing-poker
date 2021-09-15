import Color from '../../types/Color';
import Size from '../../types/Size';

export interface FileInputProps {
  color?: Color;
  size?: Size;
  id?: string;
  className?: string;
  disabled?: boolean;
  name?: string;
  multiply?: boolean;
  accept?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
