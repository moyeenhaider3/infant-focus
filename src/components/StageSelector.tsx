import React from 'react';
import { BabyStage, CardCategory } from '../types';
import { STAGE_DEFINITIONS } from '../data/cards';
import { Play, Sparkles, ChevronRight, Eye, Heart } from 'lucide-react';
import { CardSvgRenderer } from './CardSvgRenderer';
import { CARD_LIBRARY } from '../data/cards';

interface StageSelectorProps {
  onSelectStage: (stage: BabyStage) => void;
  onQuickStart: (stage: BabyStage, category: CardCategory | 'all') => void;
  lastState?: { stage: BabyStage; category: CardCategory | 'all' } | null;
  onOpenStory?: () => void;
}

export const StageSelector: React.FC<StageSelectorProps> = ({
  onSelectStage,
  onQuickStart,
  lastState,
  onOpenStory,
}) => {
  const stages: BabyStage[] = [1, 2, 3, 4];

  // Pick sample cards for thumbnail previews
  const previewCards = {
    1: CARD_LIBRARY.find((c) => c.id === 's1-faces-schematic')!,
    2: CARD_LIBRARY.find((c) => c.id === 's2-shapes-red-ring')!,
    3: CARD_LIBRARY.find((c) => c.id === 's3-patterns-hypnotic-vortex')!,
    4: CARD_LIBRARY.find((c) => c.id === 's4-faces-cheerful-clown')!,
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* Hero Header: Prompt specifies "How old is your baby?" */}
      <div className="text-center space-y-2">
        <span className="inline-block text-xs uppercase font-bold tracking-widest text-neutral-400 bg-neutral-900 border border-neutral-800 px-3 py-1 rounded-full">
          Science-Backed Visual Stimulation
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          How old is your baby?
        </h1>
        <p className="text-sm text-neutral-400 max-w-sm mx-auto">
          Infant vision evolves rapidly from newborn blur to chromatic focus. Select age to load biologically tuned cards.
        </p>
      </div>

      {/* 1-Tap Quick Start Banner (if previous session exists or for Stage 1) */}
      {lastState ? (
        <div className="bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-800 border-2 border-white/20 rounded-3xl p-4 sm:p-5 flex items-center justify-between gap-3 shadow-xl">
          <div className="min-w-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> 1-Tap Instant Resume
            </span>
            <p className="text-base font-bold text-white truncate">
              Stage {lastState.stage} • {STAGE_DEFINITIONS[lastState.stage].ageLabel}
            </p>
            <p className="text-xs text-neutral-400 capitalize truncate">
              {lastState.category === 'all' ? 'All Decks Combined' : `${lastState.category} Deck`}
            </p>
          </div>

          <button
            id="quick-resume-btn"
            onClick={() => onQuickStart(lastState.stage, lastState.category)}
            className="h-12 px-5 bg-white hover:bg-neutral-200 active:scale-95 text-black font-extrabold text-sm rounded-2xl transition shadow-lg shrink-0 flex items-center gap-2"
          >
            <Play className="w-4 h-4 fill-black" />
            <span>Play Now</span>
          </button>
        </div>
      ) : (
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-4 sm:p-5 flex items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
              Newborn Quick Start
            </span>
            <p className="text-sm font-bold text-white">Start 0–4 Weeks B&W Cards</p>
          </div>
          <button
            id="quick-start-stage-1-btn"
            onClick={() => onQuickStart(1, 'all')}
            className="h-11 px-4 bg-white hover:bg-neutral-200 active:scale-95 text-black font-bold text-xs rounded-2xl transition shadow-md shrink-0 flex items-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5 fill-black" />
            <span>1-Tap Play</span>
          </button>
        </div>
      )}

      {/* 4 Large Stage Selection Buttons (≤5 choices, 48px+ targets, one-hand operable) */}
      <div className="space-y-3.5" role="group" aria-label="Baby age stages">
        {stages.map((stageNum) => {
          const info = STAGE_DEFINITIONS[stageNum];
          const previewCard = previewCards[stageNum];

          return (
            <button
              key={stageNum}
              id={`select-stage-${stageNum}-btn`}
              onClick={() => onSelectStage(stageNum)}
              className="w-full min-h-[92px] p-4 sm:p-5 rounded-3xl bg-neutral-900/90 hover:bg-neutral-850 border-2 border-neutral-800 hover:border-neutral-500 active:scale-[0.99] text-left transition-all shadow-md group flex items-center justify-between gap-4"
            >
              {/* Left Details */}
              <div className="flex items-center gap-4 min-w-0">
                {/* Visual Thumbnail */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white border-2 border-neutral-700 overflow-hidden shrink-0 flex items-center justify-center p-1 group-hover:scale-105 transition-transform">
                  {previewCard && <CardSvgRenderer card={previewCard} className="w-full h-full" />}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <span className="text-xs font-black uppercase tracking-wider text-red-400 bg-red-950/70 border border-red-800/60 px-2.5 py-0.5 rounded-full">
                      Stage {stageNum}
                    </span>
                    <span className="text-sm font-black text-white">{info.ageLabel}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-neutral-100 group-hover:text-white transition-colors truncate">
                    {info.title}
                  </h3>

                  <p className="text-xs text-neutral-400 truncate mt-0.5">
                    {info.visualStyle}
                  </p>
                </div>
              </div>

              {/* Right Arrow / Action indicator */}
              <div className="shrink-0 flex items-center gap-2">
                <div className="w-10 h-10 rounded-2xl bg-neutral-800 group-hover:bg-white group-hover:text-black text-white flex items-center justify-center transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Science reminder card */}
      <div className="bg-black/60 border border-neutral-800 rounded-3xl p-4 text-xs text-neutral-400 flex items-start gap-3">
        <Eye className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-neutral-200 block font-semibold">Zero-Friction Science</strong>
          <p className="leading-relaxed">
            Newborn acuity is ~20/400. Staged contrast stimulates V1 cortical neurons at 8–12 inches. No login or gender profile needed.
          </p>
        </div>
      </div>

      {/* Father's Dedication Card (Heartfelt UX) */}
      <div
        id="fathers-dedication-card"
        className="bg-gradient-to-r from-neutral-900 via-neutral-900 to-rose-950/30 border border-rose-900/50 rounded-3xl p-4 sm:p-5 flex items-center justify-between gap-4 text-xs text-neutral-300 shadow-xl"
      >
        <div className="flex items-start gap-3.5 min-w-0">
          <div className="w-10 h-10 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
            <Heart className="w-5 h-5 fill-rose-500" />
          </div>
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-400 bg-rose-950/80 border border-rose-800/60 px-2.5 py-0.5 rounded-full">
                Father's Dedication
              </span>
              <span className="text-neutral-400 text-[11px]">23 Aug 2026 • 6:42 PM</span>
            </div>
            <p className="text-sm sm:text-base font-bold text-white leading-snug">
              Made by a father for <span className="text-rose-300 font-extrabold">Mohammad Hasnain</span>
            </p>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Built with love to stimulate his newborn vision and help every baby's early visual focus.
            </p>
          </div>
        </div>

        {onOpenStory && (
          <button
            id="open-story-from-card-btn"
            onClick={onOpenStory}
            className="shrink-0 h-10 px-3.5 rounded-2xl bg-neutral-800 hover:bg-neutral-700 active:scale-95 text-white font-bold text-xs flex items-center gap-1.5 transition border border-neutral-700 shadow-md"
          >
            <span>Our Story</span>
          </button>
        )}
      </div>
    </div>
  );
};
