# Leer Afrikaans — Handover Document

A Duolingo-style Afrikaans ↔ English learning app built as a React/Vite POC for Mrs Steyn's Games.

---

## Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| Framework   | React 19 + Vite                     |
| Styling     | Tailwind CSS v4 (via @tailwindcss/vite plugin) |
| TTS         | Browser Web Speech API (SpeechSynthesis) |
| Persistence | localStorage (to be replaced with Supabase) |
| Hosting     | Netlify (netlify.toml included)     |

---

## Project Structure

```
src/
  components/
    ExerciseCard.jsx      # Master card component — selects exercise subtype
    MultipleChoice.jsx    # Pick correct English from 4 options
    TypeAnswer.jsx        # Type the English translation
    ListenTranslate.jsx   # Auto-plays Afrikaans audio, then pick answer
    ProgressBar.jsx       # Top session progress bar
    SessionSummary.jsx    # End-of-session score + stars + XP
    ScoreDisplay.jsx      # Header XP, streak, best-score chips
  data/
    lessons.js            # 47 hardcoded Afrikaans/English pairs + category colours
  utils/
    speech.js             # Web Speech API wrapper (af-ZA → af → fallback)
    scoring.js            # XP constants, star calculation, session length
  hooks/
    useSession.js         # Session state machine (question → feedback → summary)
    useScore.js           # Persistent XP + best score via localStorage
  App.jsx                 # Root layout — header, progress, exercise, summary
  main.jsx                # React entry point
  index.css               # Tailwind import + base reset
```

---

## Key Design Decisions

### Session Flow
`useSession` drives the state machine:
- `'question'` → user sees the exercise
- `'feedback'` → correct/incorrect banner shown, Continue button appears
- `'summary'` → `SessionSummary` component takes over

A session is always 10 questions drawn randomly from the lesson pool.

### Exercise Types
Three types are randomly assigned per question:
1. **multiple-choice** — 4 options (1 correct + 3 random distractors)
2. **type-answer** — free-text input, case-insensitive match
3. **listen-translate** — auto-plays TTS, then multiple-choice layout

### Scoring
- 10 XP per correct answer
- +5 XP speed bonus if answered in under 5 seconds
- Stars: 3 = 9–10, 2 = 6–8, 1 = 3–5, 0 = 0–2
- XP and best session score stored in `localStorage` under keys:
  - `afrikaans_app_xp`
  - `afrikaans_app_best_score`

### TTS (Speech)
`src/utils/speech.js` uses `window.speechSynthesis`:
- Tries `af-ZA` voice first, then `af`, then uses browser default with lang hint
- Cancels any ongoing utterance before speaking a new one
- Truncates text to 190 chars to avoid Chrome's TTS cutoff bug
- `isAfrikaansVoiceAvailable()` returns a boolean for the UI warning indicator

---

## Data Shape (`lessons.js`)

Each lesson entry matches the intended Supabase `lessons` table schema:

```js
{
  id: string,           // unique, e.g. 'g1'
  afrikaans: string,
  english: string,
  category: string,     // 'Greetings' | 'Introductions' | 'Questions' | 'Responses' | 'Shopping' | 'Directions' | 'Food'
  difficulty: string,   // 'advanced_beginner' — the multi-level hook
  hint: string,         // phonetic tip or usage note
}
```

47 pairs across 7 categories.

---

## Future-Proofing: Supabase Migration

### 1. Replace hardcoded data
In `src/data/lessons.js`:
```js
// TODO: fetch from Supabase
export const lessons = [ ... ];
```
Replace the export with a Supabase query:
```js
const { data } = await supabase
  .from('lessons')
  .select('*')
  .eq('difficulty', 'advanced_beginner');
```

In `src/hooks/useSession.js`:
```js
// TODO: fetch from Supabase — replace `lessons` with an API call filtered by difficulty
const pool = lessons.filter(l => l.difficulty === difficulty);
```

### 2. Replace localStorage with Supabase user profiles
In `src/hooks/useScore.js`:
```js
// TODO: swap localStorage reads/writes for Supabase user profile calls
```
Replace `localStorage.getItem/setItem` with Supabase upsert on a `user_profiles` table:
```js
await supabase.from('user_profiles').upsert({ user_id, xp: totalXp, best_score: bestScore });
```

### 3. Add authentication
- Wrap the app in a Supabase `Auth` provider
- Gate the main game behind a login screen
- Pull user XP/bestScore from the profile on mount

### 4. Multi-level support
- `difficulty` field on each lesson is the filter hook
- Add a level selector screen that sets difficulty before `buildSession()`
- New levels: add rows with `difficulty: 'intermediate'` or `'advanced'` to Supabase

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

Steps:
1. Push to GitHub
2. Connect repo in Netlify dashboard
3. Deploy — no env vars needed for the POC

---

## Running Locally

```bash
npm install
npm run dev
# → http://localhost:5173
```

Build for production:
```bash
npm run build
npm run preview
```

---

## Known Limitations (POC)

- TTS quality depends on the user's OS/browser. macOS Safari has the best Afrikaans voice.
- `'af-ZA'` voice is not available on all platforms; the app falls back gracefully.
- No user accounts — XP resets if localStorage is cleared.
- Session always picks from all 47 lessons randomly; no spaced repetition yet.

---

## Part of Mrs Steyn's Games

This app is designed to slot into the Mrs Steyn's Games suite. The footer already carries the branding. When integrating:
- Adopt the shared colour palette / design tokens from the parent project
- Wire up shared auth/user profiles
- Link from the games hub to `/` of this app (or embed as a route)
