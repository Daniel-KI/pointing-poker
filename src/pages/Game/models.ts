import { IUser } from '../../redux/models';
import { SpVoteCardProps } from '../../components/SpVoteCard/models';
import { IssueCardProps } from '../../components/IssueCard/models';
import { SpCardFrontProps } from '../../components/SpCardFront/models';
import { UserCardProps } from '../../components/UserCard/models';

export interface GameProps {
  lobbyTitle: string;
  master?: UserCardProps;
  members?: UserCardProps[];
  issues?: IssueCardProps[];
  gameScore: GameScoreProps[];
  statisticsCards?: StatisticsCardsProps[];
  percent?: string;
  voteCards?: SpVoteCardProps[];
}

export interface GameScoreProps {
  score: string;
  player: UserCardProps;
}

export interface StatisticsCardsProps extends SpCardFrontProps {
  percent?: string;
}

export interface VoteStatistics {
  score: string;
  user: IUser;
}
