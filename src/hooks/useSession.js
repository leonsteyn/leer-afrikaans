import { useState, useCallback } from 'react';
import { lessons } from '../data/lessons';
import { SESSION_LENGTH, FAST_THRESHOLD_MS } from '../utils/scoring';

const EXERCISE_TYPES = ['multiple-choice', 'listen-translate'];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickDistractors(correct, pool, count = 3) {
  const others = pool.filter(l => l.id !== correct.id);
  return shuffle(others).slice(0, count).map(l => l.english);
}

function buildQuestion(lesson, pool) {
  const type = EXERCISE_TYPES[Math.floor(Math.random() * EXERCISE_TYPES.length)];
  const distractors = pickDistractors(lesson, pool);
  const choices = shuffle([lesson.english, ...distractors]);
  return { lesson, type, choices };
}

// TODO: fetch from Supabase — replace `lessons` with an API call filtered by difficulty
function buildSession(difficulty = 'advanced_beginner') {
  const pool = lessons.filter(l => l.difficulty === difficulty);
  const selected = shuffle(pool).slice(0, SESSION_LENGTH);
  return selected.map(lesson => buildQuestion(lesson, pool));
}

export function useSession() {
  const [questions, setQuestions] = useState(() => buildSession());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]); // { correct: bool, fast: bool }
  const [phase, setPhase] = useState('question'); // 'question' | 'feedback' | 'summary'
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());

  const currentQuestion = questions[currentIndex] ?? null;
  const isComplete = phase === 'summary';

  const submitAnswer = useCallback((userAnswer) => {
    if (phase !== 'question') return;
    const elapsed = Date.now() - questionStartTime;
    const correct = userAnswer.trim().toLowerCase() === currentQuestion.lesson.english.trim().toLowerCase();
    const fast = elapsed < FAST_THRESHOLD_MS && correct;
    setAnswers(prev => [...prev, { correct, fast, userAnswer, elapsed }]);
    setPhase('feedback');
  }, [phase, questionStartTime, currentQuestion]);

  const nextQuestion = useCallback(() => {
    if (currentIndex + 1 >= questions.length) {
      setPhase('summary');
    } else {
      setCurrentIndex(i => i + 1);
      setPhase('question');
      setQuestionStartTime(Date.now());
    }
  }, [currentIndex, questions.length]);

  const restartSession = useCallback(() => {
    setQuestions(buildSession());
    setCurrentIndex(0);
    setAnswers([]);
    setPhase('question');
    setQuestionStartTime(Date.now());
  }, []);

  const correctCount = answers.filter(a => a.correct).length;
  const fastCount = answers.filter(a => a.fast).length;

  // Streak: count of consecutive correct answers from the end
  let streak = 0;
  for (let i = answers.length - 1; i >= 0; i--) {
    if (answers[i].correct) streak++; else break;
  }

  return {
    questions,
    currentIndex,
    currentQuestion,
    answers,
    phase,
    isComplete,
    streak,
    correctCount,
    fastCount,
    submitAnswer,
    nextQuestion,
    restartSession,
    setQuestionStartTime,
  };
}
