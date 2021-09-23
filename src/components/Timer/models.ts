export interface TimerProps {
  className?: string;
  id?: string;
  minutes?: number;
  seconds?: number;
  isGameOn?: boolean;
  setMinutes?: (value: number) => void;
  setSeconds?: (value: number) => void;
  setGameOn?: (value: boolean) => void;
  setTimeOut?: (value: boolean) => void;
  disabled?: boolean;
}
