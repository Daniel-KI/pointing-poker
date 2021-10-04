export interface MessageProps {
  userId?: string;
  name: string;
  text: string;
  imgName?: string;
  isCurrentUser?: boolean;
  isLastUserMessage?: boolean;
  isFirstMessage?: boolean;
  className?: string;
}
