import { IssueCardProps } from '../../components/IssueCard/models';
import { SPCardProps } from '../../components/SPCard/models';
import { UserCardProps } from '../../components/UserCard/models';

export interface LobbyProps {
  lobbyTitle: string;
  members?: UserCardProps[];
  issues?: IssueCardProps[];
  voteCards?: SPCardProps[];
  cardsBack?: SPCardProps[];
}
