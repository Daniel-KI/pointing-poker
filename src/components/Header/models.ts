export interface HeaderProps {
  isAuthorized?: boolean;
  isChatOpen?: boolean;
  setChatOpen?: (chatState: boolean) => void;
}
