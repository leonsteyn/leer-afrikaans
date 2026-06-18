import { useState, useCallback, useEffect } from 'react';
import { lessons as localLessons } from '../data/lessons';
import { supabase, supabaseEnabled } from '../lib/supabase';
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
  return shuffle(pool.filter(l => l.id !== correct.id)).slice(0, count).map(l => l.english);
}

function buildQuestions(pool) {
  const selected = shuffle(pool).slice(0, SESSION_LENGTH);
  return selected.map(lesson => ({
    lesson,
    type: EXERCISE_TYPES[Math.floor(Math.random() * EXERCISE_TYPES.length)],
    choices: shuffle([lesson.english, ...pickDistractors(lesson, pool)]),
  }));
}

// TODO: fetch from Supabase — replace localLessons with Supabase query below
async function fetchLessons(difficulty = 'advanced_beginner') {
  if (supabaseEnabled) {
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('difficulty', difficulty);
    if (!error && data?.length > 0) return data;
  }
  // Fallback to hardcoded local data
  return localLessons.filter(l => l.difficulty === difficulty);
}

export function useSession() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [phase, setPhase] = useState('question');
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());

  useEffect(() => {
    fetchLessons().then(pool => {
      setQuestions(buildQuestions(pool));
      setLoading(false);
    });
  }, []);

  const currentQuestion = questions[currentIndex] ?? null;
  const isComplete = !loading && phase === 'summary';

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
    setLoading(true);
    fetchLessons().then(pool => {
      setQuestions(buildQuestions(pool));
      setCurrentIndex(0);
      setAnswers([]);
      setPhase('question');
      setQuestionStartTime(Date.now());
      setLoading(false);
    });
  }, []);

  const correctCount = answers.filter(a => a.correct).length;
  const fastCount = answers.filter(a => a.fast).length;

  let streak = 0;
  for (let i = answers.length - 1; i >= 0; i--) {
    if (answers[i].correct) streak++; else break;
  }

  return {
    loading,
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
