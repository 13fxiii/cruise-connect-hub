import { nextPlayerId, type GameEngine } from '../../game-engine';
import type { UnoAction, UnoCard, UnoColor, UnoPlayer, UnoState } from './types';

const COLORS: UnoColor[] = ['red', 'yellow', 'green', 'blue'];

function card(id: string, color: UnoCard['color'], value: UnoCard['value']): UnoCard {
  return { id, color, value };
}

export function createUnoDeck(): UnoCard[] {
  const deck: UnoCard[] = [];
  let id = 0;
  for (const color of COLORS) {
    deck.push(card(`uno-${id++}`, color, '0'));
    for (const value of ['1','2','3','4','5','6','7','8','9','skip','reverse','draw2'] as const) {
      deck.push(card(`uno-${id++}`, color, value), card(`uno-${id++}`, color, value));
    }
  }
  for (let i = 0; i < 4; i++) deck.push(card(`uno-${id++}`, 'wild', 'wild'), card(`uno-${id++}`, 'wild', 'wild4'));
  return shuffle(deck);
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function playable(cardToPlay: UnoCard, top: UnoCard, activeColor: UnoColor): boolean {
  return cardToPlay.color === 'wild' || cardToPlay.color === activeColor || cardToPlay.value === top.value;
}

function deal(deck: UnoCard[], players: UnoPlayer[], cardsPerPlayer = 7) {
  const hands = players.map((player) => ({ ...player, hand: [] as UnoCard[] }));
  const drawPile = [...deck];
  for (let round = 0; round < cardsPerPlayer; round++) {
    for (const player of hands) {
      const next = drawPile.pop();
      if (next) player.hand.push(next);
    }
  }
  let first = drawPile.pop();
  while (first && first.color === 'wild') {
    drawPile.unshift(first);
    first = drawPile.pop();
  }
  if (!first) throw new Error('UNO deck exhausted while creating the opening discard.');
  return { hands, drawPile, first };
}

export const unoEngine: GameEngine<UnoState, UnoAction> = {
  createInitialState({ gameId, roomId, players }) {
    const inputPlayers: UnoPlayer[] = players.map((p) => ({ ...p, hand: [] }));
    const { hands, drawPile, first } = deal(createUnoDeck(), inputPlayers);
    return {
      gameId,
      roomId,
      status: 'waiting',
      players: hands,
      currentPlayerId: hands[0]?.id,
      round: 1,
      updatedAt: Date.now(),
      drawPile,
      discardPile: [first],
      activeColor: first.color === 'wild' ? 'red' : first.color,
      direction: 1,
      hasCalledUno: {},
    };
  },

  isValidAction(state, action) {
    if (state.status === 'finished') return false;
    if (action.type === 'START_GAME') return state.status === 'waiting' && state.players.length >= 2;
    if (action.type === 'CALL_UNO') return state.currentPlayerId === action.playerId;
    if (action.type === 'DRAW_CARD') return state.status === 'playing' && state.currentPlayerId === action.playerId;
    if (action.type === 'PLAY_CARD') {
      if (state.status !== 'playing' || state.currentPlayerId !== action.playerId) return false;
      const player = state.players.find((p) => p.id === action.playerId);
      const top = state.discardPile.at(-1);
      const selected = player?.hand.find((c) => c.id === action.cardId);
      if (!player || !top || !selected) return false;
      if (!playable(selected, top, state.activeColor)) return false;
      if (selected.color === 'wild' && !action.chosenColor) return false;
    }
    return true;
  },

  reduce(state, action) {
    if (!this.isValidAction(state, action)) return state;
    let next = structuredClone(state);

    if (action.type === 'START_GAME') {
      next.status = 'playing';
      next.updatedAt = Date.now();
      return next;
    }

    if (action.type === 'CALL_UNO') {
      next.hasCalledUno[action.playerId] = true;
      next.updatedAt = Date.now();
      return next;
    }

    if (action.type === 'DRAW_CARD') {
      const player = next.players.find((p) => p.id === action.playerId);
      const drawn = next.drawPile.pop();
      if (player && drawn) player.hand.push(drawn);
      next.currentPlayerId = nextPlayerId(next.players, next.currentPlayerId, next.direction);
      next.updatedAt = Date.now();
      return next;
    }

    if (action.type === 'PLAY_CARD') {
      const player = next.players.find((p) => p.id === action.playerId)!;
      const cardIndex = player.hand.findIndex((c) => c.id === action.cardId);
      const played = player.hand.splice(cardIndex, 1)[0];
      if (!played) return state;
      next.discardPile.push(played);
      if (played.color !== 'wild') next.activeColor = played.color;
      else if (action.chosenColor) next.activeColor = action.chosenColor;

      next.hasCalledUno[action.playerId] = player.hand.length === 1 ? Boolean(next.hasCalledUno[action.playerId]) : false;
      if (player.hand.length === 0) {
        next.status = 'finished';
        next.winnerId = player.id;
        next.updatedAt = Date.now();
        return next;
      }

      if (played.value === 'reverse') next.direction = next.direction === 1 ? -1 : 1;
      let skip = played.value === 'skip' || played.value === 'reverse' || played.value === 'wild4' ? 1 : 0;
      if (played.value === 'draw2' || played.value === 'wild4') {
        const victimId = nextPlayerId(next.players, player.id, next.direction);
        const victim = next.players.find((p) => p.id === victimId);
        const count = played.value === 'draw2' ? 2 : 4;
        for (let i = 0; i < count; i++) {
          const drawn = next.drawPile.pop();
          if (victim && drawn) victim.hand.push(drawn);
        }
        skip = 1;
      }
      next.currentPlayerId = nextPlayerId(next.players, player.id, next.direction);
      if (skip) next.currentPlayerId = nextPlayerId(next.players, next.currentPlayerId, next.direction);
      next.updatedAt = Date.now();
      return next;
    }

    return next;
  },

  getWinner(state) {
    const winner = state.players.find((p) => p.id === state.winnerId);
    return winner ? { id: winner.id, username: winner.username, avatarUrl: winner.avatarUrl, connected: winner.connected } : null;
  },
};
