import { IssueCardProps } from '../../components/IssueCard/models';
import { SpCardFrontProps } from '../../components/SpCardFront/models';
import { UserCardProps } from '../../components/UserCard/models';

export interface GameProps {
  lobbyTitle: string;
  isMaster: boolean;
  master?: UserCardProps;
  members?: UserCardProps[];
  issues?: IssueCardProps[];
  gameResult: GameResultProps[];
  statisticsCards?: StatisticsCardsProps[];
  percent?: string;
}

export interface GameResultProps {
  score: string;
  player: UserCardProps;
}

export interface StatisticsCardsProps extends SpCardFrontProps {
  percent?: string;
}
