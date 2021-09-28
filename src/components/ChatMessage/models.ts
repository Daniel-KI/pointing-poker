export interface MessageProps {
  userId?: number;
  name: string;
  text: string;
  isCurrentUser?: boolean;
  isLastUserMessage?: boolean;
  isFirstMessage?: boolean;
}
