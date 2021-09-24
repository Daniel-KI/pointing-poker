import { IssueCardProps } from '../../components/IssueCard/models';
import { SpCardBackProps } from '../../components/SpCardBack/models';
import { SpOptionCardProps } from '../../components/SpOptionCard/models';
import { UserCardProps } from '../../components/UserCard/models';

export interface SettingsProps {
  lobbyTitle: string;
  isMaster: boolean;
  master?: UserCardProps;
  members?: UserCardProps[];
  issues?: IssueCardProps[];
  voteCards?: SpOptionCardProps[];
  cardsBack?: SpCardBackProps[];
}
