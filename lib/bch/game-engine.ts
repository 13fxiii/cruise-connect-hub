export type GameStatus = 'waiting' | 'playing' | 'paused' | 'finished';

export interface GamePlayer {
  id: string;
  username: string;
  avatarUrl?: string;
  connected: boolean;
}

export interface BaseGameState {
  gameId: string;
  roomId: string;
  status: GameStatus;
  players: GamePlayer[];
  currentPlayerId?: string;
  round: number;
  updatedAt: number;
}

export interface GameEvent<Action = unknown> {
  id: string;
  roomId: string;
  playerId: string;
  type: string;
  action: Action;
  createdAt: number;
}

export interface GameEngine<State extends BaseGameState, Action> {
  createInitialState(input: { gameId: string; roomId: string; players: GamePlayer[] }): State;
  reduce(state: State, action: Action): State;
  isValidAction(state: State, action: Action): boolean;
  getWinner(state: State): GamePlayer | null;
}

export function nextPlayerId(players: GamePlayer[], currentId: string | undefined, direction: 1 | -1 = 1) {
  if (!currentId || players.length === 0) return players[0]?.id;
  const index = players.findIndex((p) => p.id === currentId);
  if (index < 0) return players[0]?.id;
  return players[(index + direction + players.length) % players.length]?.id;
}
