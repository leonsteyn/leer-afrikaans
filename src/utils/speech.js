// Audio playback utility for Afrikaans TTS.
// Priority: pre-recorded file (public/audio/{id}.mp3 or .m4a) → Web Speech API fallback.

let currentAudio = null;

function stopCurrent() {
  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    } catch {}
    currentAudio = null;
  }
  try {
    window.speechSynthesis?.cancel();
  } catch {}
}

// Try each extension in order. Resolves true if a file played, false if all failed.
function playFile(id) {
  const extensions = ['mp3', 'm4a'];
  let index = 0;
  let settled = false;

  return new Promise((resolve) => {
    function settle(value) {
      if (settled) return;
      settled = true;
      resolve(value);
    }

    function tryNext() {
      if (index >= extensions.length) { settle(false); return; }
      const ext = extensions[index++];
      let audio;

      try {
        audio = new Audio(`/audio/${id}.${ext}`);
      } catch {
        tryNext();
        return;
      }

      // Guard: each handler fires at most once
      let handled = false;
      function onSuccess() {
        if (handled) return; handled = true;
        cleanup();
        stopCurrent();
        currentAudio = audio;
        audio.play().then(() => settle(true)).catch(() => {
          currentAudio = null;
          settle(false);
        });
      }
      function onError() {
        if (handled) return; handled = true;
        cleanup();
        tryNext();
      }
      function cleanup() {
        audio.removeEventListener('canplaythrough', onSuccess);
        audio.removeEventListener('error', onError);
      }

      audio.addEventListener('canplaythrough', onSuccess);
      audio.addEventListener('error', onError);

      // Abort after 4 seconds in case neither event fires
      setTimeout(() => { if (!handled) onError(); }, 4000);

      try {
        audio.load();
      } catch {
        onError();
      }
    }

    tryNext();
  });
}

// Web Speech API fallback
let afVoice = null;
let voiceResolved = false;

function resolveVoice() {
  if (voiceResolved) return;
  try {
    const voices = window.speechSynthesis?.getVoices() ?? [];
    afVoice = voices.find(v => v.lang === 'af-ZA')
      || voices.find(v => v.lang.startsWith('af'))
      || null;
  } catch {}
  voiceResolved = true;
}

if (typeof window !== 'undefined' && window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = resolveVoice;
  resolveVoice();
}

function speakFallback(text) {
  try {
    if (!window.speechSynthesis) return;
    resolveVoice();
    const safeText = text.length > 190 ? text.slice(0, 190) : text;
    const utterance = new SpeechSynthesisUtterance(safeText);
    utterance.lang = 'af-ZA';
    utterance.rate = 0.85;
    if (afVoice) utterance.voice = afVoice;
    window.speechSynthesis.speak(utterance);
  } catch {}
}

/**
 * speak(id, text)
 * Tries public/audio/{id}.mp3 then .m4a.
 * Falls back to Web Speech API if no file found.
 * Safe to call rapidly — always stops the previous sound first.
 */
export async function speak(id, text) {
  stopCurrent();
  try {
    const played = await playFile(id);
    if (!played) speakFallback(text);
  } catch {
    speakFallback(text);
  }
}
