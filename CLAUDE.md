# Leer Afrikaans — Handover Document

A Duolingo-style Afrikaans ↔ English learning app built as a React/Vite POC for Mrs Steyn's Games.

---

## Links

| Resource | URL |
|----------|-----|
| GitHub repo | https://github.com/leonsteyn/leer-afrikaans |
| Mrs Steyn's Games hub | https://mrssteynsgames.netlify.app |
| Netlify deployment | TBC — update hub tile in `leon-games/index.html` once known |

---

## Tech Stack

| Layer       | Technology |
|-------------|------------|
| Framework   | React 19 + Vite |
| Styling     | Tailwind CSS v4 (via @tailwindcss/vite plugin) |
| TTS         | Pre-recorded MP3/M4A files with Web Speech API fallback |
| Persistence | localStorage (designed to swap to Supabase — see below) |
| Hosting     | Netlify (`netlify.toml` included) |

---

## Project Structure

```
src/
  components/
    LandingPage.jsx       # Home screen — hero, category tiles, Start button
    ExerciseCard.jsx      # Master card — routes to correct exercise subtype
    MultipleChoice.jsx    # Pick correct English from 4 options
    ListenTranslate.jsx   # Auto-plays audio, then multiple choice
    ProgressBar.jsx       # Top session progress bar
    SessionSummary.jsx    # End-of-session score + stars + XP + nav buttons
    ScoreDisplay.jsx      # Header XP, streak, best-score chips
  data/
    lessons.js            # 47 hardcoded Afrikaans/English pairs + category colours
  lib/
    supabase.js           # Supabase client (disabled until env vars are set)
  utils/
    speech.js             # Audio file player with Web Speech API fallback
    scoring.js            # XP constants, star calculation, session length
  hooks/
    useSession.js         # Session state machine (question → feedback → summary)
    useScore.js           # Persistent XP + best score via localStorage
  App.jsx                 # Root — manages 'home' | 'playing' app phases
  main.jsx                # React entry point
  index.css               # Tailwind import + base reset

supabase/
  migration.sql           # Schema + seed data for future Supabase migration

public/
  audio/                  # Pre-recorded M4A/MP3 files named by lesson id (e.g. g1.m4a)

RECORDING_CHECKLIST.md    # All 47 phrases with filenames and phonetic hints
```

---

## App Flow

```
Landing Page ('home')
  ↓ Start Learning
Game Session ('playing')
  ↓ 10 questions (random mix of Multiple Choice + Listen & Translate)
  ↓ Each question: 'question' → 'feedback' → next
Session Summary
  ↓ Try Again / New Session → back to game
  ↓ Back to Mrs Steyn's Games → hub URL
```

---

## Exercise Types

Only two types are active (type-answer was removed for this iteration):

1. **multiple-choice** — 4 options (1 correct + 3 random distractors)
2. **listen-translate** — auto-plays TTS on mount, then multiple-choice layout

To re-enable type-answer, add `'type-answer'` back to `EXERCISE_TYPES` in `useSession.js`.

---

## Audio / TTS

`src/utils/speech.js` plays audio in this priority order:

1. `public/audio/{id}.mp3`
2. `public/audio/{id}.m4a`
3. Web Speech API fallback (targets `af-ZA` voice, degrades gracefully)

To add a recording: drop the file named `{id}.mp3` or `{id}.m4a` into `public/audio/`. No code changes needed. See `RECORDING_CHECKLIST.md` for all 47 phrases.

**Current recording status:** g1–g8 recorded (Greetings complete). Remaining 39 phrases use Web Speech API fallback.

---

## Scoring

| Event | XP |
|-------|----|
| Correct answer | +10 XP |
| Answer in under 5 seconds | +5 XP bonus |

Stars: 3 = 9–10 correct, 2 = 6–8, 1 = 3–5, 0 = 0–2

End messages: Uitstekend (3⭐), Welgedaan (2⭐), Nie sleg nie (1⭐), Probeer weer (0⭐)

XP and best session score stored in `localStorage`:
- `afrikaans_app_xp`
- `afrikaans_app_best_score`

---

## Data Shape (`lessons.js`)

Each lesson entry matches the intended Supabase `lessons` table schema:

```js
{
  id: string,           // unique, e.g. 'g1'
  afrikaans: string,
  english: string,
  category: string,     // 'Greetings' | 'Introductions' | 'Questions' |
                        // 'Responses' | 'Shopping' | 'Directions' | 'Food'
  difficulty: string,   // 'advanced_beginner' — the multi-level hook
  hint: string,         // phonetic tip or usage note
}
```

47 pairs across 7 categories.

---

## Navigation

| Location | Action | Destination |
|----------|--------|-------------|
| Landing page header | ← link | `mrssteynsgames.netlify.app` |
| Game header | ← button | Landing page |
| Session summary | Back to Mrs Steyn's Games | `mrssteynsgames.netlify.app` |
| Session summary | Try Again / New Session | New game session |

`HUB_URL` is defined in both `src/App.jsx` and `src/components/LandingPage.jsx`.

---

## Hub Page Integration

The Leer Afrikaans tile is in `leon-games/index.html`. Once the Netlify URL is confirmed, update:

```html
<a class="card" href="https://YOUR-NETLIFY-URL.netlify.app">
```

---

## Deployment (Netlify)

`netlify.toml` is already configured:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Steps:**
1. Go to app.netlify.com → Add new site → Import from GitHub
2. Select `leonsteyn/leer-afrikaans`
3. Build command: `npm run build` · Publish directory: `dist`
4. Deploy — no environment variables needed
5. Set site name to `leer-afrikaans` for a clean URL
6. Update `leon-games/index.html` hub tile with the confirmed URL

---

## Running Locally

```bash
npm install
npm run dev
# → http://localhost:5173
```

---

## Future: Supabase Migration

`supabase/migration.sql` contains the full schema and seed data ready to run.
`src/lib/supabase.js` is already wired up — it activates when env vars are set.

### Steps when ready:

1. Create a Supabase project at supabase.com
2. Run `supabase/migration.sql` in the SQL Editor
3. Enable **Anonymous sign-ins** under Authentication → Providers
4. Add env vars to Netlify dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Update `src/hooks/useScore.js` — swap localStorage calls for Supabase upsert on `user_profiles`
6. Update `src/hooks/useSession.js` — swap `localLessons` for Supabase query (TODO comment already in place)

### Multi-level support
The `difficulty` field on each lesson is the filter hook. Add a level selector screen that sets difficulty before `buildSession()`. New levels = new rows in Supabase with `difficulty: 'intermediate'` etc.

---

## Part of Mrs Steyn's Games

Hub: https://mrssteynsgames.netlify.app  
This app links back to the hub from the landing page header and the session summary screen.
