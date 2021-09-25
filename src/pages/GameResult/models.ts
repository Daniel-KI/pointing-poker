import { IssueCardProps } from '../../components/IssueCard/models';
import { SpCardFrontProps } from '../../components/SpCardFront/models';

export interface GameResultProps {
  lobbyTitle: string;
  gameResult?: GameResultListProps[];
}
export interface GameResultListProps {
  issue?: IssueCardProps;
  statistics?: StatisticsCardsProps[];
}
export interface StatisticsCardsProps extends SpCardFrontProps {
  percent?: string;
}
