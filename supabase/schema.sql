-- Profiles
create table if not exists profiles (
  id uuid primary key references auth.users,
  username text unique,
  bio text,
  avatar_url text,
  metadata jsonb
);

-- Players
create table if not exists players (
  id uuid primary key references auth.users,
  name text not null,
  skill_level text not null,
  points int default 0,
  created_at timestamptz default now()
);

-- Courts
create table if not exists courts (
  id serial primary key,
  name text not null
);

-- Challenges
create table if not exists challenges (
  id serial primary key,
  challenger_id uuid references players(id),
  opponent_id uuid references players(id),
  court_id int references courts(id),
  scheduled_at timestamptz,
  notes text,
  status text check (status in ('pending','accepted','declined')) default 'pending',
  created_at timestamptz default now()
);

-- Matches
create table if not exists matches (
  id serial primary key,
  challenge_id int references challenges(id),
  player1_id uuid references players(id),
  player2_id uuid references players(id),
  court_id int references courts(id),
  score text,
  winner_id uuid references players(id),
  played_at timestamptz
);

-- Seasons (optional for admin UI)
create table if not exists seasons (
  id serial primary key,
  name text,
  start_date timestamptz,
  end_date timestamptz
);
