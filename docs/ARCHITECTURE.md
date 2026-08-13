# BIG CRUISE〽️ Production Architecture

## Stack
- Next.js 16 + React 19 + TypeScript
- Tailwind v4 + shadcn/Radix primitives
- Supabase Auth (X OAuth 2.0 only), Postgres, Storage, Realtime
- GitHub as source of truth
- Vercel for production + preview deployments
- Framer Motion for UI/game motion

## Core rule
The app shell is shared. Each game owns its own rules, state model, visual renderer, interactions and animations. Never use a generic text-based game template.

## Feature boundaries
`features/arcade/engine` contains cross-game room/state contracts.
`features/arcade/<game>` contains the complete implementation of one game.
`components/bch` contains shared brand UI.
`lib/supabase` contains client/server Supabase adapters.

## Realtime model
- Persist durable room membership, results and progression in Postgres.
- Use Supabase Realtime Broadcast for live game events.
- Use private realtime channels for game rooms.
- Clients render from authoritative state snapshots; animations are driven by state transitions.

## Identity
X OAuth -> Supabase Auth -> `profiles` -> BCH ID. No email/password, Google, Apple, Microsoft, Facebook or passkeys.

## Build order
1. Foundation: auth, profile, BCH ID, navigation, design system, room infrastructure.
2. UNO vertical slice.
3. Ludo.
4. Werewolf.
5. Chess.
6. Draw It Out.
7. Codenames.
8. Word Guesses.
9. Karaoke.
10. Truth or Dare.
11. Kahoot.
12. Feed, Music Rooms, Merch, Rewards, Notifications and final polish.

## Definition of done for a game
Lobby -> join -> start -> visual gameplay -> actual interaction -> realtime state update -> round result -> rewards -> rematch/exit.

A game is not complete when buttons change text. Game objects must visibly move, update and respond to player input.