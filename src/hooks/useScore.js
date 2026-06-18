import { useState, useEffect, useRef } from 'react';
import { supabase, supabaseEnabled } from '../lib/supabase';

const LS_KEY_XP = 'afrikaans_app_xp';
const LS_KEY_BEST = 'afrikaans_app_best_score';

function loadXpLocal() {
  try { return parseInt(localStorage.getItem(LS_KEY_XP) || '0', 10); } catch { return 0; }
}
function loadBestLocal() {
  try { return parseInt(localStorage.getItem(LS_KEY_BEST) || '0', 10); } catch { return 0; }
}

async function ensureAnonSession() {
  if (!supabaseEnabled) return null;
  const { data: { session } } = await supabase.auth.getSession();
  if (session) return session.user.id;
  const { data, error } = await supabase.auth.signInAnonymously();
  if (error) return null;
  return data.user?.id ?? null;
}

async function loadProfileFromSupabase(userId) {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('xp, best_score')
    .eq('id', userId)
    .maybeSingle();
  if (error || !data) return null;
  return { xp: data.xp, bestScore: data.best_score };
}

async function saveProfileToSupabase(userId, xp, bestScore) {
  await supabase.from('user_profiles').upsert({
    id: userId,
    xp,
    best_score: bestScore,
    updated_at: new Date().toISOString(),
  });
}

export function useScore() {
  const [totalXp, setTotalXp] = useState(loadXpLocal);
  const [bestScore, setBestScore] = useState(loadBestLocal);
  const [ready, setReady] = useState(!supabaseEnabled);
  const userIdRef = useRef(null);
  const pendingSaveRef = useRef(null);

  // On mount: get/create anon session, load profile from Supabase
  useEffect(() => {
    if (!supabaseEnabled) return;
    ensureAnonSession().then(async (userId) => {
      if (!userId) { setReady(true); return; }
      userIdRef.current = userId;
      const profile = await loadProfileFromSupabase(userId);
      if (profile) {
        setTotalXp(profile.xp);
        setBestScore(profile.bestScore);
      }
      setReady(true);
    });
  }, []);

  // Debounced save: persist to Supabase 1s after last change, fallback to localStorage
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(LS_KEY_XP, String(totalXp));
      localStorage.setItem(LS_KEY_BEST, String(bestScore));
    } catch {}

    if (!supabaseEnabled || !userIdRef.current) return;
    if (pendingSaveRef.current) clearTimeout(pendingSaveRef.current);
    pendingSaveRef.current = setTimeout(() => {
      saveProfileToSupabase(userIdRef.current, totalXp, bestScore);
    }, 1000);
  }, [totalXp, bestScore, ready]);

  function addXp(amount) { setTotalXp(prev => prev + amount); }
  function updateBestScore(score) { setBestScore(prev => Math.max(prev, score)); }
  function resetAll() { setTotalXp(0); setBestScore(0); }

  return { totalXp, bestScore, ready, addXp, updateBestScore, resetAll };
}
