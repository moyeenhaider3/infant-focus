import React from 'react';
import { CardItem } from '../types';
import { STAGE_DEFINITIONS } from '../data/cards';
import { X, BookOpen, Sparkles, Brain, Eye } from 'lucide-react';

interface ScienceModalProps {
  card: CardItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ScienceModal: React.FC<ScienceModalProps> = ({ card, isOpen, onClose }) => {
  if (!isOpen || !card) return null;

  const stage = STAGE_DEFINITIONS[card.stage];

  return (
    <div
      id="science-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="science-modal-card"
        className="w-full max-w-lg bg-neutral-900 border-2 border-neutral-700 text-white rounded-3xl p-6 sm:p-7 shadow-2xl relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-5 border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white text-black flex items-center justify-center font-bold shrink-0">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-red-400 bg-red-950/60 px-2.5 py-0.5 rounded-full border border-red-800/60 mb-1">
                Stage {card.stage} • {stage.ageLabel}
              </span>
              <h3 className="text-xl font-bold text-white tracking-tight">{card.title}</h3>
            </div>
          </div>
          <button
            id="close-science-modal-btn"
            onClick={onClose}
            className="p-2 rounded-2xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Why this helps section */}
        <div className="space-y-4">
          <div className="bg-neutral-800/70 border border-neutral-700/80 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-white font-semibold text-sm mb-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Why This Visual Helps</span>
            </div>
            <p className="text-base text-neutral-200 leading-relaxed font-normal">
              {card.scienceNote}
            </p>
          </div>

          {/* Research Citation */}
          <div className="bg-black/60 border border-neutral-800 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-neutral-400 font-semibold text-xs uppercase tracking-wider mb-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Scientific Citation</span>
            </div>
            <p className="text-xs text-neutral-300 font-mono italic leading-relaxed">
              {card.citation}
            </p>
          </div>

          {/* Developmental context */}
          <div className="grid grid-cols-2 gap-3 pt-1 text-xs">
            <div className="bg-neutral-800/40 border border-neutral-800 rounded-xl p-3 flex items-start gap-2.5">
              <Eye className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-neutral-400 block font-medium">Optimal Distance</span>
                <strong className="text-neutral-200 font-semibold">{stage.focalDistance}</strong>
              </div>
            </div>
            <div className="bg-neutral-800/40 border border-neutral-800 rounded-xl p-3 flex items-start gap-2.5">
              <Brain className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-neutral-400 block font-medium">Visual Acuity</span>
                <strong className="text-neutral-200 font-semibold">{stage.visualStyle}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <div className="mt-6">
          <button
            id="got-it-science-modal-btn"
            onClick={onClose}
            className="w-full py-3.5 px-5 bg-white hover:bg-neutral-200 text-black font-bold text-sm rounded-2xl transition-transform active:scale-[0.98] shadow-lg flex items-center justify-center gap-2"
          >
            Got it, return to cards
          </button>
        </div>
      </div>
    </div>
  );
};
