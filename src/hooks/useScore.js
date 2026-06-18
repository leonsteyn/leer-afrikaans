import { useState, useEffect } from 'react';

const LS_KEY_XP = 'afrikaans_app_xp';
const LS_KEY_BEST = 'afrikaans_app_best_score';

// TODO: swap localStorage reads/writes for Supabase user profile calls
// when auth is added. Shape: { xp: number, bestScore: number }

function loadXp() {
  try { return parseInt(localStorage.getItem(LS_KEY_XP) || '0', 10); } catch { return 0; }
}
function loadBest() {
  try { return parseInt(localStorage.getItem(LS_KEY_BEST) || '0', 10); } catch { return 0; }
}

export function useScore() {
  const [totalXp, setTotalXp] = useState(loadXp);
  const [bestScore, setBestScore] = useState(loadBest);

  useEffect(() => {
    try { localStorage.setItem(LS_KEY_XP, String(totalXp)); } catch {}
  }, [totalXp]);

  useEffect(() => {
    try { localStorage.setItem(LS_KEY_BEST, String(bestScore)); } catch {}
  }, [bestScore]);

  function addXp(amount) { setTotalXp(prev => prev + amount); }
  function updateBestScore(score) { setBestScore(prev => Math.max(prev, score)); }
  function resetAll() { setTotalXp(0); setBestScore(0); }

  return { totalXp, bestScore, addXp, updateBestScore, resetAll };
}
