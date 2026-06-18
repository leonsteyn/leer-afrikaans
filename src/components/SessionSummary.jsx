import { calcStars, calcXp, SESSION_LENGTH } from '../utils/scoring';

export default function SessionSummary({ correctCount, fastCount, totalXp, bestScore, onRetry, onNew }) {
  const stars = calcStars(correctCount);
  const sessionXp = calcXp(correctCount, fastCount);

  const starDisplay = Array.from({ length: 3 }, (_, i) => (
    <span key={i} className={`text-4xl ${i < stars ? 'opacity-100' : 'opacity-25'}`}>⭐</span>
  ));

  const messages = {
    3: ["Uitstekend! 🎉", "You nailed it! Your Afrikaans is fantastic!"],
    2: ["Welgedaan! 👏", "Good job! Keep practicing and you'll ace it."],
    1: ["Nie sleg nie! 💪", "Not bad! Review the tricky ones and try again."],
    0: ["Probeer weer! 🤔", "Every expert was once a beginner. You've got this!"],
  };
  const [headline, subtitle] = messages[stars];

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-lg mx-auto text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-1">{headline}</h2>
      <p className="text-gray-500 mb-6">{subtitle}</p>

      <div className="flex justify-center gap-1 mb-6">{starDisplay}</div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200">
          <p className="text-3xl font-bold text-emerald-600">{correctCount}/{SESSION_LENGTH}</p>
          <p className="text-xs text-gray-500 mt-1">Correct</p>
        </div>
        <div className="bg-yellow-50 rounded-2xl p-4 border border-yellow-200">
          <p className="text-3xl font-bold text-yellow-600">+{sessionXp}</p>
          <p className="text-xs text-gray-500 mt-1">XP Earned</p>
        </div>
        <div className="bg-purple-50 rounded-2xl p-4 border border-purple-200">
          <p className="text-3xl font-bold text-purple-600">{totalXp}</p>
          <p className="text-xs text-gray-500 mt-1">Total XP</p>
        </div>
      </div>

      {fastCount > 0 && (
        <p className="text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2 mb-4">
          ⚡ You answered {fastCount} question{fastCount > 1 ? 's' : ''} in under 5 seconds! +{fastCount * 5} bonus XP
        </p>
      )}

      {bestScore > 0 && (
        <p className="text-xs text-gray-400 mb-6">
          🏆 Your best session score: {bestScore}/10
        </p>
      )}

      <div className="flex gap-3">
        <button
          onClick={onRetry}
          className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-2xl transition-colors cursor-pointer"
        >
          🔄 Try Again
        </button>
        <button
          onClick={onNew}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-2xl transition-colors cursor-pointer"
        >
          🆕 New Session
        </button>
      </div>
    </div>
  );
}
