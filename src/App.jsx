import { useEffect } from 'react';
import { useSession } from './hooks/useSession';
import { useScore } from './hooks/useScore';
import { calcXp } from './utils/scoring';
import ProgressBar from './components/ProgressBar';
import ScoreDisplay from './components/ScoreDisplay';
import ExerciseCard from './components/ExerciseCard';
import SessionSummary from './components/SessionSummary';

export default function App() {
  const session = useSession();
  const score = useScore();

  const {
    questions, currentIndex, currentQuestion, answers,
    phase, isComplete, streak, correctCount, fastCount,
    submitAnswer, nextQuestion, restartSession, setQuestionStartTime,
  } = session;

  const lastAnswer = answers[answers.length - 1] ?? null;

  // When session ends, persist best score and add XP
  useEffect(() => {
    if (isComplete) {
      score.updateBestScore(correctCount);
      score.addXp(calcXp(correctCount, fastCount));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isComplete]);

  // Reset question timer when a new question appears
  useEffect(() => {
    if (phase === 'question') setQuestionStartTime(Date.now());
  }, [currentIndex, phase, setQuestionStartTime]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-sky-50 to-violet-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🇿🇦</span>
            <div className="text-left">
              <h1 className="text-lg font-bold text-gray-800 leading-tight">Leer Afrikaans</h1>
              <p className="text-xs text-gray-400">Advanced Beginner</p>
            </div>
          </div>
          <ScoreDisplay totalXp={score.totalXp} streak={streak} bestScore={score.bestScore} />
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center px-4 py-6 gap-5 w-full max-w-lg mx-auto">
        {!isComplete && (
          <>
            {/* Progress */}
            <div className="w-full">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>Question {Math.min(currentIndex + 1, questions.length)} of {questions.length}</span>
                <span>{correctCount} correct</span>
              </div>
              <ProgressBar current={currentIndex + (phase === 'feedback' ? 1 : 0)} total={questions.length} />
            </div>

            {currentQuestion && (
              <ExerciseCard
                key={currentIndex}
                question={currentQuestion}
                phase={phase}
                onAnswer={submitAnswer}
                onNext={nextQuestion}
                lastAnswer={lastAnswer}
              />
            )}
          </>
        )}

        {isComplete && (
          <SessionSummary
            correctCount={correctCount}
            fastCount={fastCount}
            totalXp={score.totalXp}
            bestScore={score.bestScore}
            onRetry={restartSession}
            onNew={restartSession}
          />
        )}
      </main>

      <footer className="text-center text-xs text-gray-400 py-4">
        Leer Afrikaans · POC · Mrs Steyn&apos;s Games
      </footer>
    </div>
  );
}
