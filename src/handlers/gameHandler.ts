import { Server } from 'socket.io';
import { IGameResult, IIssue, ISocket, IUser } from '../models';

export default (io: Server, socket: ISocket): void => {
  const updateTimer = (minutes: number, seconds: number) => {
    io.in(socket.roomId).emit('timer', { minutes, seconds });
  };

  const startRound = (minutes: number, seconds: number) => {
    updateTimer(minutes, seconds);
    io.in(socket.roomId).emit('startRound');
  };

  const endRound = () => {
    io.in(socket.roomId).emit('endRound');
  };

  const sendVote = (member: IUser, score: string) => {
    io.in(socket.roomId).emit('newVote', { member, score });
  };

  const changeCurrentIssue = (issue: IIssue) => {
    io.in(socket.roomId).emit('currentIssue', issue);
  };

  const sendGameState = (
    userId: string,
    state: {
      result: IGameResult[];
      currentIssue: IIssue;
      isCardsFlipped: boolean;
      isRoundStarted: boolean;
      isRoundEnded: boolean;
    },
  ) => {
    io.to(userId).emit('getGameState', state);
  };

  const finishGame = () => {
    io.to(socket.roomId).emit('finishGame');
  };

  socket.on('game:startRound', startRound);
  socket.on('game:endRound', endRound);
  socket.on('game:vote', sendVote);
  socket.on('game:currentIssue', changeCurrentIssue);
  socket.on('game:sendState', sendGameState);
  socket.on('game:updateTimer', updateTimer);
  socket.on('game:finish', finishGame);
};
