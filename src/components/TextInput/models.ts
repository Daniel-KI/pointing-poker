import Autocomplete from '../../types/Autocomplete';
import Color from '../../types/Color';
import Size from '../../types/Size';

export interface TextInputProps {
  color?: Color;
  size?: Size;
  id?: string;
  className?: string;
  bordered?: boolean;
  disabled?: boolean;
  autocomplete?: Autocomplete;
  placeholder?: string;
  maxlength?: number;
  value?: string;
  required?: boolean;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onInvalid?: (event: React.FormEvent<HTMLInputElement>) => void;
}
