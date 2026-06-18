import { useState } from 'react';
import { speak } from '../utils/speech';
import { CATEGORY_COLORS } from '../data/lessons';
import MultipleChoice from './MultipleChoice';
import TypeAnswer from './TypeAnswer';
import ListenTranslate from './ListenTranslate';

const TYPE_LABELS = {
  'multiple-choice': { icon: '🧠', label: 'Multiple Choice' },
  'type-answer':     { icon: '✍️',  label: 'Type the Answer' },
  'listen-translate':{ icon: '👂', label: 'Listen & Translate' },
};

export default function ExerciseCard({ question, phase, onAnswer, onNext, lastAnswer }) {
  const [userAnswer, setUserAnswer] = useState(null);
  const { lesson, type, choices } = question;
  const submitted = phase === 'feedback';
  const catColor = CATEGORY_COLORS[lesson.category] ?? CATEGORY_COLORS['Greetings'];
  const typeInfo = TYPE_LABELS[type];

  function handleSelect(answer) {
    setUserAnswer(answer);
    onAnswer(answer);
  }

  function handleNext() {
    setUserAnswer(null);
    onNext();
  }

  const isCorrect = lastAnswer?.correct;

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 w-full max-w-lg mx-auto">
      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${catColor.bg} ${catColor.text} ${catColor.border}`}>
          {lesson.category}
        </span>
        <span className="text-sm text-gray-400 font-medium">
          {typeInfo.icon} {typeInfo.label}
        </span>
      </div>

      {/* Prompt — hidden for listen-translate (audio is the prompt) */}
      {type !== 'listen-translate' && (
        <div className="flex items-center gap-3 mb-2">
          <p className="text-2xl font-bold text-gray-800 flex-1">{lesson.afrikaans}</p>
          <button
            onClick={() => speak(lesson.id, lesson.afrikaans)}
            title="Hear pronunciation"
            className="text-2xl hover:scale-110 active:scale-95 transition-transform cursor-pointer"
          >
            🔊
          </button>
        </div>
      )}

      {/* Hint */}
      {lesson.hint && type !== 'listen-translate' && (
        <p className="text-xs text-gray-400 mb-4 italic">💡 {lesson.hint}</p>
      )}

      {/* Exercise */}
      {type === 'multiple-choice' && (
        <MultipleChoice
          choices={choices}
          onSelect={handleSelect}
          submitted={submitted}
          correctAnswer={lesson.english}
          userAnswer={userAnswer}
        />
      )}
      {type === 'type-answer' && (
        <TypeAnswer
          onSubmit={handleSelect}
          submitted={submitted}
          correctAnswer={lesson.english}
          userAnswer={userAnswer}
        />
      )}
      {type === 'listen-translate' && (
        <ListenTranslate
          lesson={lesson}
          choices={choices}
          onSelect={handleSelect}
          submitted={submitted}
          correctAnswer={lesson.english}
          userAnswer={userAnswer}
        />
      )}

      {/* Feedback banner */}
      {submitted && (
        <div className={`mt-4 rounded-2xl px-4 py-3 ${isCorrect ? 'bg-emerald-50 border border-emerald-300' : 'bg-red-50 border border-red-300'}`}>
          <p className={`font-bold text-lg ${isCorrect ? 'text-emerald-700' : 'text-red-600'}`}>
            {isCorrect ? '✅ Correct!' : '❌ Not quite!'}
            {lastAnswer?.fast && isCorrect && <span className="ml-2 text-sm text-amber-600">⚡ +5 XP speed bonus!</span>}
          </p>
          {!isCorrect && (
            <p className="text-sm text-gray-600 mt-1">
              Correct answer: <span className="font-semibold">{lesson.english}</span>
            </p>
          )}
          {lesson.hint && (
            <p className="text-xs text-gray-500 mt-1 italic">💡 {lesson.hint}</p>
          )}
          <button
            onClick={handleNext}
            className="mt-3 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 rounded-xl transition-colors cursor-pointer"
          >
            Continue →
          </button>
        </div>
      )}
    </div>
  );
}
