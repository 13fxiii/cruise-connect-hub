'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { unoEngine } from '@/lib/bch/games/uno/engine';
import type { UnoCard, UnoColor, UnoPlayer, UnoState } from '@/lib/bch/games/uno/types';

type DemoPlayer = UnoPlayer;

const colorClasses: Record<UnoColor, string> = {
  red: 'bg-[#ff3b30]',
  blue: 'bg-[#3478f6]',
  green: 'bg-[#30d158]',
  yellow: 'bg-[#ffd60a] text-black',
};

function Card({ card, onClick, disabled }: { card: UnoCard; onClick?: () => void; disabled?: boolean }) {
  const color = card.color === 'wild' ? 'bg-black' : colorClasses[card.color];
  const label = card.value === 'draw2' ? '+2' : card.value === 'wild4' ? '+4' : card.value.toUpperCase();
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileTap={!disabled ? { scale: 0.94, y: -8 } : undefined}
      whileHover={!disabled ? { y: -14 } : undefined}
      className={`relative h-28 w-[72px] shrink-0 overflow-hidden rounded-2xl border-4 border-white/90 shadow-xl ${color} ${disabled ? 'opacity-40' : ''}`}
      aria-label={`${card.color} ${card.value}`}
    >
      <span className="absolute inset-[9px] rounded-[45%] border-2 border-white/50" />
      <span className="relative z-10 text-2xl font-black tracking-tight">{label}</span>
    </motion.button>
  );
}

function PlayerSeat({ player, active }: { player: DemoPlayer; active: boolean }) {
  return (
    <div className={`flex items-center gap-3 rounded-2xl border px-3 py-2 ${active ? 'border-[#d4af37] bg-[#d4af37]/10' : 'border-white/10 bg-white/[0.04]'}`}>
      <div className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-[#d4af37] to-[#7e6215] text-sm font-black text-black">
        {player.username.slice(0, 1).toUpperCase()}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-bold">{player.username}</div>
        <div className="text-xs text-white/50">{player.hand.length} cards</div>
      </div>
      {active && <span className="rounded-full bg-[#d4af37] px-2 py-1 text-[10px] font-black text-black">TURN</span>}
    </div>
  );
}

export default function UnoPage() {
  const [seed] = useState(() => Math.random().toString(36).slice(2));
  const [playerId] = useState('fx');
  const initial = useMemo(() => {
    const players: DemoPlayer[] = [
      { id: 'fx', username: 'FX〽️', connected: true, hand: [] },
      { id: 'rival', username: 'Cruise Rival', connected: true, hand: [] },
    ];
    return unoEngine.createInitialState({ gameId: seed, roomId: 'DEMO', players });
  }, [seed]);
  const [state, setState] = useState<UnoState>(() => initial);
  const me = state.players.find((p) => p.id === playerId)!;
  const top = state.discardPile.at(-1)!;
  const started = state.status !== 'waiting';

  function dispatch(action: Parameters<typeof unoEngine.reduce>[1]) {
    setState((current) => unoEngine.reduce(current, action));
  }

  function playable(card: UnoCard) {
    return card.color === 'wild' || card.color === state.activeColor || card.value === top.value;
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-xl flex-col px-4 pb-6 pt-4">
        <header className="flex items-center justify-between pb-4">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#d4af37]">BIG CRUISE〽️ · ARCADE</div>
            <h1 className="mt-1 text-2xl font-black">UNO</h1>
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold">ROOM #510011</div>
        </header>

        <section className="rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-3 shadow-2xl">
          <PlayerSeat player={state.players[1]} active={state.currentPlayerId === state.players[1].id} />

          <div className="my-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-[24px] border border-white/10 bg-black/50 p-4">
            <button
              type="button"
              disabled={!started || state.currentPlayerId !== playerId}
              onClick={() => dispatch({ type: 'DRAW_CARD', playerId })}
              className="rounded-2xl border border-white/10 bg-white/5 px-3 py-4 text-center disabled:opacity-40"
            >
              <div className="mx-auto mb-2 grid size-16 place-items-center rounded-xl border-4 border-white/80 bg-gradient-to-br from-[#171717] to-[#050505] text-lg font-black shadow-lg">〽️</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-white/50">DRAW {state.drawPile.length}</div>
            </button>

            <div className="relative grid size-24 place-items-center">
              <Card card={top} />
            </div>

            <div className="text-right">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">COLOR</div>
              <div className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-black uppercase ${colorClasses[state.activeColor]}`}>{state.activeColor}</div>
              <div className="mt-3 text-[10px] uppercase tracking-widest text-white/40">{state.status === 'finished' ? 'FINISHED' : state.currentPlayerId === playerId ? 'YOUR TURN' : 'RIVAL TURN'}</div>
            </div>
          </div>

          <PlayerSeat player={state.players[0]} active={state.currentPlayerId === playerId} />

          <div className="mt-4 rounded-[24px] border border-white/10 bg-black/40 p-3">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-white/50">YOUR HAND</span>
              <button
                type="button"
                onClick={() => dispatch({ type: 'CALL_UNO', playerId })}
                disabled={me.hand.length !== 1 || state.currentPlayerId !== playerId}
                className="rounded-full bg-[#d4af37] px-3 py-1.5 text-[10px] font-black text-black disabled:opacity-30"
              >
                UNO
              </button>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {me.hand.map((card) => (
                <Card
                  key={card.id}
                  card={card}
                  disabled={!started || state.currentPlayerId !== playerId || !playable(card) || (card.color === 'wild' && me.hand.length !== 1 && false)}
                  onClick={() => {
                    const chosenColor = card.color === 'wild' ? 'red' : undefined;
                    dispatch({ type: 'PLAY_CARD', playerId, cardId: card.id, chosenColor });
                  }}
                />
              ))}
            </div>
          </div>

          {!started ? (
            <button
              type="button"
              onClick={() => dispatch({ type: 'START_GAME' })}
              className="mt-3 w-full rounded-2xl bg-[#d4af37] px-4 py-4 text-sm font-black uppercase tracking-widest text-black shadow-lg"
            >
              START GAME
            </button>
          ) : (
            <div className="mt-3 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs text-white/60">
              <span>Tap a playable card.</span>
              <span>{state.status === 'finished' ? `${state.winnerId === playerId ? 'YOU WIN' : 'RIVAL WINS'}` : `ROUND ${state.round}`}</span>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
