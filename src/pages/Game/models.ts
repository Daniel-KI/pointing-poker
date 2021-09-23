import { IssueCardProps } from '../../components/IssueCard/models';
import { UserCardProps } from '../../components/UserCard/models';

export interface GameProps {
  lobbyTitle: string;
  isMaster: boolean;
  master?: UserCardProps;
  members?: UserCardProps[];
  issues?: IssueCardProps[];
  gameResult: GameResultProps[];
}

export interface GameResultProps {
  score: string;
  player: UserCardProps;
}
