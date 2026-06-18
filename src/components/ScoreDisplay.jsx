export default function ScoreDisplay({ totalXp, streak, bestScore }) {
  return (
    <div className="flex items-center gap-4 text-sm font-semibold">
      <div className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full border border-yellow-300">
        <span>⭐</span>
        <span>{totalXp} XP</span>
      </div>
      {streak > 1 && (
        <div className="flex items-center gap-1 bg-orange-100 text-orange-700 px-3 py-1 rounded-full border border-orange-300">
          <span>🔥</span>
          <span>{streak} streak</span>
        </div>
      )}
      {bestScore > 0 && (
        <div className="flex items-center gap-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full border border-purple-300">
          <span>🏆</span>
          <span>Best: {bestScore}/10</span>
        </div>
      )}
    </div>
  );
}
