import type { BaseGameState } from '../../game-engine';

export type UnoColor = 'red' | 'yellow' | 'green' | 'blue';
export type UnoValue =
  | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
  | 'skip' | 'reverse' | 'draw2' | 'wild' | 'wild4';

export interface UnoCard {
  id: string;
  color: UnoColor | 'wild';
  value: UnoValue;
}

export interface UnoPlayer {
  id: string;
  username: string;
  avatarUrl?: string;
  hand: UnoCard[];
  connected: boolean;
}

export interface UnoState extends Omit<BaseGameState, 'players'> {
  players: UnoPlayer[];
  drawPile: UnoCard[];
  discardPile: UnoCard[];
  activeColor: UnoColor;
  direction: 1 | -1;
  hasCalledUno: Record<string, boolean>;
  winnerId?: string;
  penaltyPlayerId?: string;
}

export type UnoAction =
  | { type: 'START_GAME' }
  | { type: 'PLAY_CARD'; playerId: string; cardId: string; chosenColor?: UnoColor }
  | { type: 'DRAW_CARD'; playerId: string }
  | { type: 'CALL_UNO'; playerId: string }
  | { type: 'NEXT_TURN' };
