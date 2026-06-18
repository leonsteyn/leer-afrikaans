export default function MultipleChoice({ choices, onSelect, submitted, correctAnswer, userAnswer }) {
  return (
    <div className="grid grid-cols-1 gap-3 mt-4">
      {choices.map((choice, i) => {
        let style = 'border-2 border-gray-200 bg-white text-gray-700 hover:border-emerald-400 hover:bg-emerald-50';
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
  );
}
