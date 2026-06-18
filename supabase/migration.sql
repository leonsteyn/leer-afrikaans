-- Leer Afrikaans — Supabase schema
-- Run this in the Supabase SQL editor to set up the database.

-- ── lessons ──────────────────────────────────────────────────────────────────
create table if not exists lessons (
  id          text primary key,
  afrikaans   text not null,
  english     text not null,
  category    text not null,
  difficulty  text not null default 'advanced_beginner',
  hint        text
);

-- Seed data — matches src/data/lessons.js exactly
insert into lessons (id, afrikaans, english, category, difficulty, hint) values
  ('g1', 'Goeie môre',                   'Good morning',             'Greetings',     'advanced_beginner', '"Khoo-yuh maw-ruh"'),
  ('g2', 'Goeie middag',                  'Good afternoon',           'Greetings',     'advanced_beginner', '"Khoo-yuh mid-dakh"'),
  ('g3', 'Goeie naand',                   'Good evening',             'Greetings',     'advanced_beginner', '"Khoo-yuh nahnt"'),
  ('g4', 'Totsiens',                      'Goodbye',                  'Greetings',     'advanced_beginner', '"Tot-seens" — literally "till we see again"'),
  ('g5', 'Hoe gaan dit?',                 'How are you?',             'Greetings',     'advanced_beginner', '"Hoo khahn dit"'),
  ('g6', 'Dit gaan goed, dankie',         'I am fine, thank you',     'Greetings',     'advanced_beginner', 'Common polite reply'),
  ('g7', 'Baie dankie',                   'Thank you very much',      'Greetings',     'advanced_beginner', '"Buy-yuh dahn-kee"'),
  ('g8', 'Asseblief',                     'Please',                   'Greetings',     'advanced_beginner', '"As-uh-bleef"'),
  ('i1', 'My naam is...',                 'My name is...',            'Introductions', 'advanced_beginner', '"May nahm is"'),
  ('i2', 'Wat is jou naam?',              'What is your name?',       'Introductions', 'advanced_beginner', '"Vat is yoh nahm"'),
  ('i3', 'Aangename kennis',              'Nice to meet you',         'Introductions', 'advanced_beginner', 'Formal greeting on first meeting'),
  ('i4', 'Ek kom van Suid-Afrika',        'I am from South Africa',   'Introductions', 'advanced_beginner', '"Ek kom fun Sayd Afrika"'),
  ('i5', 'Hoe oud is jy?',               'How old are you?',         'Introductions', 'advanced_beginner', '"Hoo owt is yay"'),
  ('i6', 'Ek is tien jaar oud',           'I am ten years old',       'Introductions', 'advanced_beginner', 'Replace "tien" with your age'),
  ('q1', 'Waar is die badkamer?',         'Where is the bathroom?',   'Questions',     'advanced_beginner', '"Vaar is dee but-kah-mer"'),
  ('q2', 'Hoeveel kos dit?',              'How much does it cost?',   'Questions',     'advanced_beginner', '"Hoo-feel kos dit"'),
  ('q3', 'Kan jy my help?',              'Can you help me?',         'Questions',     'advanced_beginner', '"Kun yay may help"'),
  ('q4', 'Praat jy Engels?',             'Do you speak English?',    'Questions',     'advanced_beginner', '"Praht yay Eng-els"'),
  ('q5', 'Wat beteken dit?',             'What does that mean?',     'Questions',     'advanced_beginner', '"Vat buh-tay-ken dit"'),
  ('q6', 'Watter tyd is dit?',           'What time is it?',         'Questions',     'advanced_beginner', '"Vat-ter tayt is dit"'),
  ('r1', 'Ja',                            'Yes',                      'Responses',     'advanced_beginner', '"Yah"'),
  ('r2', 'Nee',                           'No',                       'Responses',     'advanced_beginner', '"Nee-uh" (rhymes with "near")'),
  ('r3', 'Ek verstaan nie',               'I do not understand',      'Responses',     'advanced_beginner', '"Ek fer-stahn nee"'),
  ('r4', 'Herhaal asseblief',             'Please repeat that',       'Responses',     'advanced_beginner', '"Her-hahl as-uh-bleef"'),
  ('r5', 'Ek weet nie',                   'I do not know',            'Responses',     'advanced_beginner', '"Ek veet nee"'),
  ('r6', 'Natuurlik',                     'Of course',                'Responses',     'advanced_beginner', '"Nah-teer-lik"'),
  ('s1', 'Ek wil dit koop',              'I want to buy this',       'Shopping',      'advanced_beginner', '"Ek vil dit kawp"'),
  ('s2', 'Het julle dit in blou?',        'Do you have it in blue?',  'Shopping',      'advanced_beginner', '"Het yull-uh dit in bloo"'),
  ('s3', 'Dit is te duur',               'This is too expensive',    'Shopping',      'advanced_beginner', '"Dit is tuh deer"'),
  ('s4', 'Waar is die kassier?',         'Where is the till/checkout?', 'Shopping',   'advanced_beginner', '"Vaar is dee kus-seer"'),
  ('s5', 'Kan ek met kaart betaal?',     'Can I pay by card?',       'Shopping',      'advanced_beginner', 'Very common in SA shops'),
  ('s6', 'Ek soek ''n geskenk',          'I am looking for a gift',  'Shopping',      'advanced_beginner', '"Ek sook un khe-skenk"'),
  ('d1', 'Gaan reguit',                  'Go straight ahead',        'Directions',    'advanced_beginner', '"Khahn rekh-ayt"'),
  ('d2', 'Draai links',                  'Turn left',                'Directions',    'advanced_beginner', '"Dry-ee links"'),
  ('d3', 'Draai regs',                   'Turn right',               'Directions',    'advanced_beginner', '"Dry-ee rekhs"'),
  ('d4', 'Dit is naby',                  'It is nearby',             'Directions',    'advanced_beginner', '"Dit is nah-bay"'),
  ('d5', 'Hoe ver is dit?',             'How far is it?',           'Directions',    'advanced_beginner', '"Hoo fer is dit"'),
  ('d6', 'By die robot',                 'At the traffic light',     'Directions',    'advanced_beginner', 'SA slang — robots = traffic lights!'),
  ('f1', 'Die spyskaart, asseblief',     'The menu, please',         'Food',          'advanced_beginner', '"Dee spays-kaart"'),
  ('f2', 'Ek wil graag bestel',          'I would like to order',    'Food',          'advanced_beginner', '"Ek vil khrakh buh-stel"'),
  ('f3', 'Wat beveel jy aan?',           'What do you recommend?',   'Food',          'advanced_beginner', '"Vat buh-feel yay ahn"'),
  ('f4', 'Ek is vegetariër',             'I am vegetarian',          'Food',          'advanced_beginner', '"Ek is fek-huh-tah-ree-er"'),
  ('f5', 'Die rekening, asseblief',      'The bill, please',         'Food',          'advanced_beginner', '"Dee reh-ken-ing"'),
  ('f6', 'Dis heerlik!',                 'It is delicious!',         'Food',          'advanced_beginner', '"Dis heer-lik" — great compliment to a host'),
  ('f7', 'Nog koffie, asseblief',        'More coffee, please',      'Food',          'advanced_beginner', 'Essential South African phrase!')
on conflict (id) do nothing;

-- ── user_profiles ─────────────────────────────────────────────────────────────
-- Uses Supabase anonymous auth — no signup required.
-- Each browser session gets a UUID automatically.
create table if not exists user_profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  xp          integer not null default 0,
  best_score  integer not null default 0,
  updated_at  timestamptz not null default now()
);

-- Row-level security: users can only read/write their own profile
alter table user_profiles enable row level security;

create policy "Users manage own profile"
  on user_profiles
  for all
  using  (auth.uid() = id)
  with check (auth.uid() = id);

-- Allow anonymous users to insert their own profile on first play
create policy "Anon users can insert own profile"
  on user_profiles
  for insert
  with check (auth.uid() = id);

-- lessons are public read-only
alter table lessons enable row level security;

create policy "Lessons are public"
  on lessons
  for select
  using (true);
