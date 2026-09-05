import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Moon, RefreshCw, Home, CheckCircle2, AlertCircle } from 'lucide-react';

interface SessionEndModalProps {
  isOpen: boolean;
  durationSeconds: number;
  cardsCount: number;
  onContinue: () => void;
  onFinish: () => void;
  onViewProgress: () => void;
}

export const SessionEndModal: React.FC<SessionEndModalProps> = ({
  isOpen,
  durationSeconds,
  cardsCount,
  onContinue,
  onFinish,
  onViewProgress,
}) => {
  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#FFFFFF', '#E60000', '#333333'],
        });
      } catch {
        // Confetti fallback
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const minutes = Math.floor(durationSeconds / 60);
  const seconds = durationSeconds % 60;
  const timeFormatted = `${minutes}m ${seconds > 0 ? `${seconds}s` : ''}`;

  return (
    <div
      id="session-end-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300"
    >
      <div
        id="session-end-card"
        className="w-full max-w-lg bg-neutral-900 border-2 border-neutral-700 text-white rounded-3xl p-6 sm:p-8 shadow-2xl text-center relative animate-in zoom-in-95 duration-200"
      >
        {/* Soft Icon Badge */}
        <div className="w-16 h-16 mx-auto mb-4 rounded-3xl bg-white text-black flex items-center justify-center shadow-lg">
          <Moon className="w-8 h-8 text-neutral-900 fill-neutral-900" />
        </div>

        <span className="inline-block text-xs uppercase font-bold tracking-widest text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1 rounded-full mb-3">
          Session Complete
        </span>

        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
          Great job! Take a break.
        </h2>

        <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-md mx-auto mb-6">
          Baby’s visual cortex worked hard! Short 2–3 minute sessions prevent overstimulation and maximize neural consolidation.
        </p>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-neutral-800/70 border border-neutral-700/70 rounded-2xl p-3.5">
            <span className="text-xs text-neutral-400 font-medium block">Time Focused</span>
            <span className="text-xl sm:text-2xl font-black text-white">{timeFormatted || '3 mins'}</span>
          </div>
          <div className="bg-neutral-800/70 border border-neutral-700/70 rounded-2xl p-3.5">
            <span className="text-xs text-neutral-400 font-medium block">Cards Explored</span>
            <span className="text-xl sm:text-2xl font-black text-white">{cardsCount}</span>
          </div>
        </div>

        {/* Science Notice: Disengagement Cues */}
        <div className="bg-black/60 border border-neutral-800 rounded-2xl p-4 text-left mb-6">
          <div className="flex items-center gap-2 text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
            <AlertCircle className="w-4 h-4 text-amber-400" />
            <span>Parent Cue Watch</span>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed">
            If your baby looked away, yawned, rubbed eyes, or squirmed, these are healthy self-regulation cues saying <em className="text-white not-italic font-medium">"I’m full for now!"</em>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <button
            id="finish-session-btn"
            onClick={onFinish}
            className="w-full py-4 px-6 bg-white hover:bg-neutral-200 active:scale-[0.98] text-black font-bold text-base rounded-2xl transition shadow-xl flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Finish & Rest (Logged)</span>
          </button>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              id="continue-extra-minute-btn"
              onClick={onContinue}
              className="py-3 px-4 bg-neutral-800 hover:bg-neutral-700 active:scale-[0.98] text-white font-semibold text-xs sm:text-sm rounded-2xl border border-neutral-700 transition flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>+1 Min Extra</span>
            </button>
            <button
              id="view-progress-btn"
              onClick={onViewProgress}
              className="py-3 px-4 bg-neutral-800 hover:bg-neutral-700 active:scale-[0.98] text-white font-semibold text-xs sm:text-sm rounded-2xl border border-neutral-700 transition flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4 text-red-400" />
              <span>Weekly Log</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
