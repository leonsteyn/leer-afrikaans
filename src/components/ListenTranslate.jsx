import { useEffect, useState } from 'react';
import { speak } from '../utils/speech';

export default function ListenTranslate({ lesson, choices, onSelect, submitted, correctAnswer, userAnswer }) {
  const [played, setPlayed] = useState(false);

  // Auto-play when the question mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      speak(lesson.id, lesson.afrikaans);
      setPlayed(true);
    }, 400);
    return () => clearTimeout(timer);
  }, [lesson.id]);

  return (
    <div className="mt-4">
      <div className="flex flex-col items-center gap-3 mb-5">
        <button
          onClick={() => { speak(lesson.id, lesson.afrikaans); setPlayed(true); }}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-2xl text-lg shadow-md transition-colors cursor-pointer"
        >
          <span className="text-2xl">🔊</span>
          Listen Again
        </button>
        {!played && (
          <p className="text-sm text-gray-500">Press play to hear the phrase</p>
        )}
      </div>
      <div className="grid grid-cols-1 gap-3">
        {choices.map((choice, i) => {
          let style = 'border-2 border-gray-200 bg-white text-gray-700 hover:border-blue-400 hover:bg-blue-50';
          if (submitted) {
            if (choice === correctAnswer) {
              style = 'border-2 border-emerald-500 bg-emerald-100 text-emerald-800 font-semibold';
            } else if (choice === userAnswer && choice !== correctAnswer) {
              style = 'border-2 border-red-400 bg-red-100 text-red-700';
            } else {
              style = 'border-2 border-gray-200 bg-gray-50 text-gray-400';
            }
          }
          return (
            <button
              key={i}
              onClick={() => !submitted && onSelect(choice)}
              disabled={submitted}
              className={`w-full text-left px-4 py-3 rounded-xl text-base transition-all duration-150 cursor-pointer disabled:cursor-default ${style}`}
            >
              <span className="font-bold text-gray-400 mr-2">{String.fromCharCode(65 + i)}.</span>
              {choice}
            </button>
          );
        })}
      </div>
    </div>
  );
}
