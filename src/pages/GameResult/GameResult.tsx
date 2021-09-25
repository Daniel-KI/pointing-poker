import React from 'react';
import './GameResult.scss';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { GameResultListProps, GameResultProps, StatisticsCardsProps } from './models';
import IssueCard from '../../components/IssueCard/IssueCard';
import SpCardFront from '../../components/SpCardFront/SpCardFront';
import Button from '../../components/Button/Button';

const GameResult: React.FC<GameResultProps> = ({ lobbyTitle, gameResult }) => {
  return (
    <div className='game-result'>
      <Header isAuthorized />
      <div className='game-result__wrapper'>
        <h2 className='game-result__title'>{lobbyTitle}</h2>
        <div className='game-result__download-btn-wrapper'>
          <Button color='success' size='large' className='game-result__download-btn'>
            Download statistics
          </Button>
        </div>
        <div className='game-result__statistics'>
          {gameResult?.map((issue: GameResultListProps, index: number) => (
            <div className='game-result__statistics_statistic-wrapper'>
              <IssueCard
                key={index.toString()}
                name={issue.issue?.name}
                priority={issue.issue?.priority}
                className='game-result__statistics_issue'
                color='dark'
              />

              <div className='game-result__statistics_cards-wrapper'>
                {issue.statistics?.map((element: StatisticsCardsProps, key: number) => (
                  <div>
                    <SpCardFront
                      key={key.toString()}
                      className='game-result__statistics_cards-front-item'
                      score={element.score}
                      units={element.units}
                      size='small'
                    />
                    <div className='game-result__statistics_percent'>{element.percent}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GameResult;

// В родительском компоненте:

// <GameResult lobbyTitle='Spring 23 planning (issues 13, 533, 5623, 3252, 6623)' gameResult={gameResult} />

// const gameResult: GameResultListProps[] = [
//   {
//     issue: {
//       name: '2563',
//       priority: 'low priority',
//     },
//     statistics: [
//       { score: '10', units: 'SP', percent: '33%' },
//       { score: '10', units: 'SP', percent: '33%' },
//     ],
//   },
//   {
//     issue: {
//       name: '3563',
//       priority: 'low priority',
//     },
//     statistics: [
//       { score: '20', units: 'SP', percent: '33%' },
//       { score: '20', units: 'SP', percent: '33%' },
//       { score: '20', units: 'SP', percent: '33%' },
//       { score: '20', units: 'SP', percent: '33%' },
//     ],
//   },
// ];
