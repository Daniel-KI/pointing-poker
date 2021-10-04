export interface MessageProps {
  userId?: number;
  name: string;
  text: string;
  imgName?: string;
  isCurrentUser?: boolean;
  isLastUserMessage?: boolean;
  isFirstMessage?: boolean;
}
