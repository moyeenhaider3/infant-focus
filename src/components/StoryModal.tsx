import React from 'react';
import { X, Heart, Sparkles, Baby, Clock, Calendar, Eye } from 'lucide-react';

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StoryModal: React.FC<StoryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      id="story-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="story-modal-content"
        className="w-full max-w-lg max-h-[90vh] bg-neutral-900 border-2 border-neutral-700 text-white rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto relative animate-in zoom-in-95 duration-200 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center font-bold">
              <Heart className="w-5 h-5 fill-rose-500" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white tracking-tight">The Story & Inspiration</h3>
              <p className="text-xs text-neutral-400">Why this web app was created</p>
            </div>
          </div>
          <button
            id="close-story-modal-btn"
            onClick={onClose}
            className="p-2 rounded-2xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            aria-label="Close story"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Dedication Spotlight Card */}
        <div className="bg-gradient-to-br from-neutral-800 via-neutral-900 to-rose-950/40 border border-rose-900/60 rounded-3xl p-5 space-y-3 shadow-inner">
          <div className="flex items-center gap-2 text-rose-400 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Father's Dedication</span>
          </div>

          <blockquote className="text-base sm:text-lg font-bold text-white leading-snug">
            "Made by a father for <span className="text-rose-300">Mohammad Hasnain</span>, born on 23 August 2026 at 6:42 PM."
          </blockquote>

          {/* Birth details chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-neutral-300">
            <span className="flex items-center gap-1.5 bg-neutral-800/80 border border-neutral-700/80 px-3 py-1.5 rounded-xl font-medium">
              <Baby className="w-3.5 h-3.5 text-rose-400" />
              Mohammad Hasnain
            </span>
            <span className="flex items-center gap-1.5 bg-neutral-800/80 border border-neutral-700/80 px-3 py-1.5 rounded-xl font-medium">
              <Calendar className="w-3.5 h-3.5 text-neutral-400" />
              23 August 2026
            </span>
            <span className="flex items-center gap-1.5 bg-neutral-800/80 border border-neutral-700/80 px-3 py-1.5 rounded-xl font-medium">
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
              6:42 PM
            </span>
          </div>
        </div>

        {/* Story Narrative */}
        <div className="space-y-3.5 text-sm text-neutral-300 leading-relaxed">
          <p>
            When my son <strong className="text-white">Mohammad Hasnain</strong> arrived on August 23, 2026, seeing his fragile eyes trying to decipher a blurry world filled me with awe and a desire to give him the best possible start.
          </p>
          <p>
            During quiet late-night feeds and soothing sessions, I delved into developmental pediatrics and vision neuroscience. Research revealed that newborn retinas and the visual cortex (V1) thrive on high-contrast optical boundaries, rhythmic tracking, and calibrated focal distances (8–12 inches).
          </p>
          <p>
            Rather than relying on noisy apps with distracting ads, subscription walls, or complex sign-ups, I created this app as a pure gift for my son. It is completely free, zero-friction, and grounded in peer-reviewed science—for Mohammad Hasnain, and for every parent striving to nurture their newborn's curiosity and brain development.
          </p>
        </div>

        {/* Closing note & CTA */}
        <div className="pt-2">
          <button
            id="close-story-cta-btn"
            onClick={onClose}
            className="w-full py-3.5 bg-white hover:bg-neutral-200 active:scale-[0.98] text-black font-extrabold text-sm rounded-2xl transition shadow-lg flex items-center justify-center gap-2"
          >
            <span>Explore Visual Flashcards</span>
          </button>
        </div>
      </div>
    </div>
  );
};
