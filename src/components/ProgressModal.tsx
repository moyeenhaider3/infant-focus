import React, { useState } from 'react';
import {
  X,
  Bell,
  Calendar,
  Flame,
  Clock,
  Pin,
  Check,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { getWeeklySessionStats, loadPreferences, loadSessions, savePreferences } from '../utils/storage';
import { STAGE_DEFINITIONS } from '../data/cards';
import { BabyStage, CardCategory } from '../types';

interface ProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDeck?: (stage: BabyStage, category: CardCategory) => void;
}

export const ProgressModal: React.FC<ProgressModalProps> = ({ isOpen, onClose, onSelectDeck }) => {
  const [prefs, setPrefs] = useState(loadPreferences());
  const [sessions, setSessions] = useState(loadSessions());
  const [notifStatus, setNotifStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const stats = getWeeklySessionStats();

  const handleToggleReminder = async () => {
    const nextState = !prefs.reminderEnabled;
    const updated = savePreferences({ reminderEnabled: nextState });
    setPrefs(updated);

    if (nextState && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        setNotifStatus('Reminder active! You will be nudged daily.');
      } else if (Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          setNotifStatus('Notification permission granted!');
          new Notification('Infant Visual Flashcards', {
            body: "Time for today's 3-min brain session! High-contrast visual focus ready.",
            icon: '/favicon.ico',
          });
        } else {
          setNotifStatus('Notifications blocked in browser settings.');
        }
      }
    } else {
      setNotifStatus(null);
    }
  };

  const handleTogglePin = (deckId: string) => {
    const isPinned = prefs.pinnedDecks.includes(deckId);
    const newPinned = isPinned
      ? prefs.pinnedDecks.filter((id) => id !== deckId)
      : [...prefs.pinnedDecks, deckId];
    const updated = savePreferences({ pinnedDecks: newPinned });
    setPrefs(updated);
  };

  const handleClearSessions = () => {
    if (window.confirm('Clear your session logs?')) {
      localStorage.removeItem('infant_cards_sessions_v1');
      setSessions([]);
    }
  };

  const popularDecks: { id: string; stage: BabyStage; category: CardCategory; title: string }[] = [
    { id: '1-faces', stage: 1, category: 'faces', title: 'Stage 1 • Schematic Faces' },
    { id: '1-shapes', stage: 1, category: 'shapes', title: 'Stage 1 • Macro Shapes' },
    { id: '2-patterns', stage: 2, category: 'patterns', title: 'Stage 2 • Red Bullseyes' },
    { id: '2-objects', stage: 2, category: 'objects', title: 'Stage 2 • Contrast Objects' },
    { id: '3-patterns', stage: 3, category: 'patterns', title: 'Stage 3 • Optical Spirals' },
  ];

  return (
    <div
      id="progress-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="progress-modal-content"
        className="w-full max-w-xl max-h-[90vh] bg-neutral-900 border-2 border-neutral-700 text-white rounded-3xl p-6 sm:p-7 shadow-2xl overflow-y-auto relative animate-in zoom-in-95 duration-200 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white text-black flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">Parent Motivation Log</h3>
              <p className="text-xs text-neutral-400">Track routine consistency (for you, not baby performance)</p>
            </div>
          </div>
          <button
            id="close-progress-modal-btn"
            onClick={onClose}
            className="p-2 rounded-2xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Weekly Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-neutral-800/80 border border-neutral-700 rounded-2xl p-3.5 text-center">
            <span className="text-xs text-neutral-400 font-semibold block mb-1">This Week</span>
            <span className="text-2xl font-black text-white">{stats.thisWeekCount}</span>
            <span className="text-[10px] text-neutral-400 block mt-0.5">sessions</span>
          </div>

          <div className="bg-neutral-800/80 border border-neutral-700 rounded-2xl p-3.5 text-center">
            <span className="text-xs text-neutral-400 font-semibold block mb-1">Total Time</span>
            <span className="text-2xl font-black text-white">{stats.thisWeekMinutes}</span>
            <span className="text-[10px] text-neutral-400 block mt-0.5">minutes</span>
          </div>

          <div className="bg-neutral-800/80 border border-neutral-700 rounded-2xl p-3.5 text-center">
            <span className="text-xs text-neutral-400 font-semibold block mb-1">Active Days</span>
            <div className="flex items-center justify-center gap-1">
              <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />
              <span className="text-2xl font-black text-white">{stats.uniqueDays}</span>
            </div>
            <span className="text-[10px] text-neutral-400 block mt-0.5">days</span>
          </div>
        </div>

        {/* Daily Reminder Setup (v1.1 feature) */}
        <div className="bg-neutral-800/60 border border-neutral-700 rounded-2xl p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-950/80 border border-red-800 text-red-400 flex items-center justify-center shrink-0 mt-0.5">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Daily 3-Min Brain Reminder</h4>
                <p className="text-xs text-neutral-300 leading-relaxed mt-0.5">
                  "Time for today's 3-min brain session" nudge when baby is alert.
                </p>
              </div>
            </div>

            <button
              id="toggle-reminder-btn"
              onClick={handleToggleReminder}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                prefs.reminderEnabled
                  ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                  : 'bg-neutral-700 text-neutral-200 hover:bg-neutral-600'
              }`}
            >
              {prefs.reminderEnabled ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Enabled</span>
                </>
              ) : (
                <span>Set Daily</span>
              )}
            </button>
          </div>

          {notifStatus && (
            <p className="mt-2.5 text-xs text-amber-300 bg-amber-950/40 border border-amber-800/50 p-2 rounded-xl">
              {notifStatus}
            </p>
          )}
        </div>

        {/* Pinned Favorite Decks */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Pin className="w-4 h-4 text-red-400" />
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Pinned Quick-Launch Decks</h4>
          </div>

          <div className="space-y-2">
            {popularDecks.map((deck) => {
              const isPinned = prefs.pinnedDecks.includes(deck.id);
              return (
                <div
                  key={deck.id}
                  className="flex items-center justify-between p-3 rounded-2xl bg-neutral-800/40 hover:bg-neutral-800/80 border border-neutral-700/60 transition gap-3"
                >
                  <div
                    className="flex-1 cursor-pointer"
                    onClick={() => {
                      onSelectDeck?.(deck.stage, deck.category);
                      onClose();
                    }}
                  >
                    <p className="text-sm font-bold text-white">{deck.title}</p>
                    <p className="text-xs text-neutral-400">
                      {STAGE_DEFINITIONS[deck.stage].ageLabel} • Tap to play deck
                    </p>
                  </div>
                  <button
                    onClick={() => handleTogglePin(deck.id)}
                    className={`p-2 rounded-xl border transition ${
                      isPinned
                        ? 'bg-red-950/70 border-red-800 text-red-400'
                        : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:text-white'
                    }`}
                    title={isPinned ? 'Unpin' : 'Pin to favorites'}
                  >
                    <Pin className={`w-4 h-4 ${isPinned ? 'fill-red-400' : ''}`} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Session History */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-neutral-400" />
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Recent Sessions</h4>
            </div>
            {sessions.length > 0 && (
              <button
                onClick={handleClearSessions}
                className="text-[11px] text-neutral-400 hover:text-red-400 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                Clear
              </button>
            )}
          </div>

          {sessions.length === 0 ? (
            <div className="text-center py-6 bg-neutral-800/30 rounded-2xl border border-neutral-800 text-neutral-400 text-xs">
              <Sparkles className="w-6 h-6 mx-auto mb-1.5 opacity-40" />
              No sessions logged yet. Complete your first 2–3 minute card session today!
            </div>
          ) : (
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1 text-xs">
              {sessions.slice(0, 10).map((sess) => (
                <div
                  key={sess.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-neutral-800/30 border border-neutral-800"
                >
                  <div>
                    <span className="font-bold text-white">Stage {sess.stage}</span>
                    <span className="text-neutral-400 ml-2 capitalize">({sess.category})</span>
                    <span className="text-neutral-500 block text-[10px]">
                      {new Date(sess.date).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-emerald-400">{sess.durationSeconds}s</span>
                    <span className="text-neutral-500 block text-[10px]">{sess.completedCardsCount} cards</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Father's Inspiration Note */}
        <div className="bg-neutral-950/60 border border-neutral-800 rounded-2xl p-3.5 text-center text-xs text-neutral-400">
          <p className="flex items-center justify-center gap-1.5 flex-wrap">
            <span>Made with love by a father for</span>
            <strong className="text-white font-medium">Mohammad Hasnain</strong>
            <span className="text-neutral-500">(born 23 Aug 2026, 6:42 PM)</span>
          </p>
        </div>

        {/* Bottom Done Button */}
        <button
          id="close-progress-bottom-btn"
          onClick={onClose}
          className="w-full py-3.5 bg-white hover:bg-neutral-200 active:scale-[0.98] text-black font-bold text-sm rounded-2xl transition shadow-lg"
        >
          Done
        </button>
      </div>
    </div>
  );
};
