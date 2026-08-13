export const bch = {
  colors: {
    black: '#050505',
    surface: '#0D0D0D',
    surface2: '#151515',
    border: 'rgba(255,255,255,0.10)',
    gold: '#D4AF37',
    goldBright: '#F4D76B',
    white: '#FFFFFF',
    muted: '#9B9B9B',
    games: {
      uno: { red: '#FF3B30', blue: '#3478F6', green: '#30D158', yellow: '#FFD60A' },
      ludo: { red: '#FF453A', blue: '#0A84FF', green: '#30D158', yellow: '#FFD60A' },
      werewolf: { crimson: '#B3263E', violet: '#6C3CC9' },
      karaoke: { pink: '#FF2D92', purple: '#AF52DE' },
    },
  },
  radius: { sm: '10px', md: '16px', lg: '24px', pill: '999px' },
  motion: { fast: 0.15, normal: 0.25, slow: 0.45 },
} as const;

export type BCHGameType =
  | 'codenames'
  | 'word-guesses'
  | 'ludo'
  | 'werewolf'
  | 'chess'
  | 'draw-it-out'
  | 'uno'
  | 'karaoke'
  | 'truth-or-dare'
  | 'kahoot';