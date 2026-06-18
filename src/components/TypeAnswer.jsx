import { useState, useRef, useEffect } from 'react';

export default function TypeAnswer({ onSubmit, submitted, correctAnswer, userAnswer }) {
  const [value, setValue] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (!submitted) {
      setValue('');
      inputRef.current?.focus();
    }
  }, [submitted]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!submitted && value.trim()) onSubmit(value);
  }

  let inputStyle = 'border-2 border-gray-300 focus:border-emerald-400 focus:outline-none';
  if (submitted) {
    const correct = value.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
    inputStyle = correct
      ? 'border-2 border-emerald-500 bg-emerald-50'
      : 'border-2 border-red-400 bg-red-50';
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
      <input
        ref={inputRef}
        type="text"
        value={submitted ? userAnswer : value}
        onChange={e => setValue(e.target.value)}
        disabled={submitted}
        placeholder="Type the English translation..."
        className={`w-full px-4 py-3 rounded-xl text-base ${inputStyle} disabled:cursor-default transition-all`}
      />
      {!submitted && (
        <button
          type="submit"
          disabled={!value.trim()}
          className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 text-white font-semibold px-6 py-3 rounded-xl transition-colors cursor-pointer disabled:cursor-default"
        >
          Submit
        </button>
      )}
    </form>
  );
}
