create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null unique,
  display_name text,
  avatar_url text,
  x_user_id text unique,
  cruiser_since date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.bch_ids (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  bch_number text not null unique,
  points bigint not null default 0,
  xp integer not null default 0,
  level integer not null default 1,
  streak_days integer not null default 0,
  qr_payload text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.game_rooms (
  id uuid primary key default gen_random_uuid(),
  game_type text not null check (game_type in ('codenames','word-guesses','ludo','werewolf','chess','draw-it-out','uno','karaoke','truth-or-dare','kahoot')),
  room_code text not null unique,
  host_id uuid not null references public.profiles(id),
  status text not null default 'waiting' check (status in ('waiting','playing','finished','cancelled')),
  max_players integer not null check (max_players > 0),
  state jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.game_players (
  room_id uuid not null references public.game_rooms(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  seat integer,
  score integer not null default 0,
  connected boolean not null default true,
  joined_at timestamptz not null default now(),
  primary key (room_id, user_id)
);

create table if not exists public.game_results (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.game_rooms(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  placement integer,
  score integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.bch_ids enable row level security;
alter table public.game_rooms enable row level security;
alter table public.game_players enable row level security;
alter table public.game_results enable row level security;

create policy "profiles readable to authenticated users" on public.profiles for select to authenticated using (true);
create policy "users update own profile" on public.profiles for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);
create policy "users insert own profile" on public.profiles for insert to authenticated with check (auth.uid() = id);

create policy "BCH IDs readable to authenticated users" on public.bch_ids for select to authenticated using (true);
create policy "users update own BCH ID" on public.bch_ids for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "game rooms readable to authenticated users" on public.game_rooms for select to authenticated using (true);
create policy "users create game rooms" on public.game_rooms for insert to authenticated with check (auth.uid() = host_id);
create policy "hosts update game rooms" on public.game_rooms for update to authenticated using (auth.uid() = host_id) with check (auth.uid() = host_id);

create policy "game players readable to authenticated users" on public.game_players for select to authenticated using (true);
create policy "users join games" on public.game_players for insert to authenticated with check (auth.uid() = user_id);
create policy "users update own game membership" on public.game_players for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "users leave games" on public.game_players for delete to authenticated using (auth.uid() = user_id);

create policy "results readable to authenticated users" on public.game_results for select to authenticated using (true);
create policy "users create own game result" on public.game_results for insert to authenticated with check (auth.uid() = user_id);
