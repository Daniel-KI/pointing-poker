import React from 'react';
import './GameResult.scss';
import { useSelector } from 'react-redux';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { GameResultListProps, GameResultProps, StatisticsCardsProps } from './models';
import IssueCard from '../../components/IssueCard/IssueCard';
import SpCardFront from '../../components/SpCardFront/SpCardFront';
import Button from '../../components/Button/Button';
import Chat from '../../components/Chat/Chat';
import { IState } from '../../redux/models';

const GameResult: React.FC<GameResultProps> = ({ lobbyTitle, gameResult }) => {
  const messages = useSelector((state: IState) => state.messages);

  return (
    <div className='game-result'>
      <Header isAuthorized />
      <div className='game-result__wrapper'>
        <div className='game-result__results'>
          <h2 className='game-result__title'>{lobbyTitle}</h2>
          <div className='game-result__download-btn-wrapper'>
            <Button color='success' size='large' className='game-result__download-btn'>
              Download statistics
            </Button>
          </div>
          <div className='game-result__statistics'>
            {gameResult?.map((issue: GameResultListProps, index: number) => (
              <div className='game-result__statistic-wrapper'>
                <IssueCard
                  key={index.toString()}
                  name={issue.issue?.name}
                  priority={issue.issue?.priority}
                  className='game-result__statistics-issue'
                  color='dark'
                />

                <div className='game-result__cards-wrapper'>
                  {issue.statistics?.map((element: StatisticsCardsProps, key: number) => (
                    <div>
                      <SpCardFront key={key.toString()} score={element.score} units={element.units} size='small' />
                      <div className='game-result__statistics-percent'>{element.percent}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='game-result__chat-wrapper'>
          <Chat chatMessage={messages} className='game-result__chat' />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GameResult;
