import Game from '../pages/Game/Game';
import GameResult from '../pages/GameResult/GameResult';
import Lobby from '../pages/Lobby/Lobby';
import Settings from '../pages/Settings/Settings';

export const routes = [
  { path: '/lobby/:roomId', name: 'Lobby', component: Lobby },
  { path: '/game/:roomId', name: 'Game', component: Game },
  { path: '/gameResults/:roomId', name: 'Game results', component: GameResult },
];

export const adminRoutes = [{ path: '/settings/:roomId', name: 'Settings', component: Settings }];
