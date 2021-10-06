import React from 'react';
import './GameResult.scss';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import IssueCard from '../../components/IssueCard/IssueCard';
import SpCardFront from '../../components/SpCardFront/SpCardFront';
import Button from '../../components/Button/Button';
import { IState } from '../../redux/models';
import downloadJsonFile from '../../utils/downloadJsonFile';

const GameResult: React.FC = () => {
  const lobbyTitle = useSelector((state: IState) => state.room.name);
  const gameResult = useSelector((state: IState) => state.gameResults);
  const scoreType = useSelector((state: IState) => state.settings.scoreType);

  const downloadBtnOnClick = () => {
    const jsonData = JSON.stringify(gameResult);
    toast.success('Statistics saved in json format');
    downloadJsonFile(jsonData, `statistics`);
  };

  return (
    <div className='game-result'>
      <Header isAuthorized />
      <div className='game-result__wrapper'>
        <div className='game-result__container'>
          <h2 className='game-result__title'>{lobbyTitle || 'Results'}</h2>

          <div className='game-result__statistics-file'>
            <p className='game-result__small-text'>Click here to download json file with results</p>
            <div className='game-result__download-file-card'>
              <Button color='success' size='large' onClick={downloadBtnOnClick}>
                Download statistics
              </Button>
            </div>
          </div>

          <div className='game-result__statistics'>
            {gameResult.map((result, index) => (
              <div className='game-result__data'>
                <IssueCard
                  key={index.toString()}
                  name={result.issue.name}
                  priority={result.issue.priority}
                  className='game-result__issue'
                  color='dark'
                />

                <div className='game-result__values'>
                  {result.votesPercentage.map((element, key) => (
                    <div className='game-result__value-wrapper'>
                      <SpCardFront
                        key={key.toString()}
                        score={element.value}
                        units={scoreType}
                        size='small'
                        className='game-result__value-vote-card'
                      />
                      <div className='game-result__small-text'>{element.percentage}%</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer
        position='bottom-left'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default GameResult;
