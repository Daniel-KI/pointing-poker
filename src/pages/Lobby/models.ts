import { UserCardProps } from '../../components/UserCard/models';

export interface LobbyProps {
  lobbyTitle: string;
  master?: UserCardProps;
  members?: UserCardProps[];
}
