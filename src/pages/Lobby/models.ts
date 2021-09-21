import { IssueCardProps } from '../../components/IssueCard/models';
import { SpCardProps } from '../../components/SpCard/models';
import { UserCardProps } from '../../components/UserCard/models';

export interface LobbyProps {
  lobbyTitle: string;
  isMaster: boolean;
  master?: UserCardProps;
  members?: UserCardProps[];
  issues?: IssueCardProps[];
  voteCards?: SpCardProps[];
  cardsBack?: SpCardProps[];
}
