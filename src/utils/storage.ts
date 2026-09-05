import { BabyStage, CardCategory, ParentPreferences, SessionRecord } from '../types';

const STORAGE_KEYS = {
  PREFERENCES: 'infant_cards_prefs_v1',
  SESSIONS: 'infant_cards_sessions_v1',
  LAST_STATE: 'infant_cards_last_state_v1',
  DISMISSED_DISTANCE_REMINDER: 'infant_cards_dist_dismissed_v1',
};

export const DEFAULT_PREFERENCES: ParentPreferences = {
  autoAdvanceSeconds: 7,
  sessionLimitMinutes: 3,
  trackingMode: false,
  invertedColors: false,
  soundCue: true,
  reminderEnabled: false,
  reminderTime: '10:00',
  pinnedDecks: ['1-shapes', '1-faces', '2-patterns'],
};

export const loadPreferences = (): ParentPreferences => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
    if (!raw) return DEFAULT_PREFERENCES;
    return { ...DEFAULT_PREFERENCES, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PREFERENCES;
  }
};

export const savePreferences = (prefs: Partial<ParentPreferences>): ParentPreferences => {
  try {
    const current = loadPreferences();
    const updated = { ...current, ...prefs };
    localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(updated));
    return updated;
  } catch {
    return DEFAULT_PREFERENCES;
  }
};

export const loadSessions = (): SessionRecord[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SESSIONS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const logSession = (record: Omit<SessionRecord, 'id' | 'date'>): SessionRecord => {
  const newRecord: SessionRecord = {
    ...record,
    id: `sess-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    date: new Date().toISOString(),
  };

  try {
    const current = loadSessions();
    const updated = [newRecord, ...current].slice(0, 100); // keep last 100
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(updated));
  } catch (e) {
    console.warn('Failed to save session record to localStorage', e);
  }

  return newRecord;
};

export const getWeeklySessionStats = () => {
  const sessions = loadSessions();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const thisWeekSessions = sessions.filter((s) => new Date(s.date) >= oneWeekAgo);
  const totalMinutes = Math.round(
    thisWeekSessions.reduce((acc, curr) => acc + curr.durationSeconds, 0) / 60
  );

  // Calculate streak in unique days
  const uniqueDates = new Set(
    sessions.map((s) => new Date(s.date).toISOString().split('T')[0])
  );

  return {
    thisWeekCount: thisWeekSessions.length,
    thisWeekMinutes: totalMinutes,
    totalSessions: sessions.length,
    uniqueDays: uniqueDates.size,
  };
};

export const saveLastState = (stage: BabyStage, category: CardCategory | 'all') => {
  try {
    localStorage.setItem(STORAGE_KEYS.LAST_STATE, JSON.stringify({ stage, category }));
  } catch {
    // Ignore
  }
};

export const loadLastState = (): { stage: BabyStage; category: CardCategory | 'all' } | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LAST_STATE);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const playSoftChime = () => {
  try {
    // Web Audio API pure synthesized gentle chime (no external mp3 file needed)
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5 gentle warm tone
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12); // A5

    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.36);
  } catch {
    // Audio autoplay or web audio not supported
  }
};
