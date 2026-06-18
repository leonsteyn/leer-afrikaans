import { CATEGORY_COLORS } from '../data/lessons';

const HUB_URL = 'https://mrssteyngames.netlify.app';

const CATEGORIES = [
  { name: 'Greetings',     icon: '👋' },
  { name: 'Introductions', icon: '🤝' },
  { name: 'Questions',     icon: '❓' },
  { name: 'Responses',     icon: '💬' },
  { name: 'Shopping',      icon: '🛒' },
  { name: 'Directions',    icon: '🗺️' },
  { name: 'Food',          icon: '🍽️' },
];

export default function LandingPage({ totalXp, bestScore, onStart }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-sky-50 to-violet-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
          <a
            href={HUB_URL}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            title="Back to Mrs Steyn's Games"
          >
            ←
          </a>
          <span className="text-sm text-gray-400">Mrs Steyn&apos;s Games</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center px-4 py-8 max-w-lg mx-auto w-full gap-6">
        {/* Hero */}
        <div className="text-center">
          <div className="text-7xl mb-4">🇿🇦</div>
          <h1 className="text-4xl font-black text-gray-800 mb-2">Leer Afrikaans</h1>
          <p className="text-gray-500 text-lg">Everyday conversation · Advanced Beginner</p>
        </div>

        {/* Stats */}
        {(totalXp > 0 || bestScore > 0) && (
          <div className="flex gap-4 w-full">
            <div className="flex-1 bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
              <p className="text-2xl font-bold text-yellow-500">{totalXp}</p>
              <p className="text-xs text-gray-400 mt-1">Total XP</p>
            </div>
            <div className="flex-1 bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
              <p className="text-2xl font-bold text-purple-500">{bestScore}/10</p>
              <p className="text-xs text-gray-400 mt-1">Best Score</p>
            </div>
          </div>
        )}

        {/* Categories */}
        <div className="w-full bg-white rounded-3xl shadow-sm border border-gray-100 p-5">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">What you&apos;ll learn</p>
          <div className="grid grid-cols-2 gap-2">
            {CATEGORIES.map(({ name, icon }) => {
              const c = CATEGORY_COLORS[name];
              return (
                <div key={name} className={`flex items-center gap-2 px-3 py-2 rounded-xl ${c.bg} ${c.text}`}>
                  <span>{icon}</span>
                  <span className="text-sm font-medium">{name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* How it works */}
        <div className="w-full bg-white rounded-3xl shadow-sm border border-gray-100 p-5">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">How it works</p>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🧠</span>
              <p className="text-sm text-gray-600">Multiple choice — pick the right English meaning</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">👂</span>
              <p className="text-sm text-gray-600">Listen &amp; translate — hear it, then choose</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">⭐</span>
              <p className="text-sm text-gray-600">Earn XP, build streaks, beat your best score</p>
            </div>
          </div>
        </div>

        {/* Start button */}
        <button
          onClick={onStart}
          className="w-full bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-black text-xl py-4 rounded-2xl shadow-lg transition-all cursor-pointer"
        >
          Start Learning →
        </button>
      </main>

      <footer className="text-center text-xs text-gray-400 py-4">
        Leer Afrikaans · Mrs Steyn&apos;s Games
      </footer>
    </div>
  );
}
