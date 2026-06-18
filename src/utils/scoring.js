export const XP_PER_CORRECT = 10;
export const XP_BONUS_FAST = 5;    // awarded if answered in under 5 seconds
export const FAST_THRESHOLD_MS = 5000;
export const SESSION_LENGTH = 10;

export function calcStars(score) {
  if (score >= 9) return 3;
  if (score >= 6) return 2;
  if (score >= 3) return 1;
  return 0;
}

export function calcXp(correct, fast) {
  return correct * XP_PER_CORRECT + fast * XP_BONUS_FAST;
}
