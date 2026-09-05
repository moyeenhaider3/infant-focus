import React from 'react';
import { BabyStage, CardCategory } from '../types';
import { STAGE_DEFINITIONS, CATEGORY_INFO, CARD_LIBRARY } from '../data/cards';
import {
  Square,
  Smile,
  Disc,
  Cat,
  Sparkles,
  ChevronLeft,
  Play,
  Layers,
  Eye,
} from 'lucide-react';
import { CardSvgRenderer } from './CardSvgRenderer';

interface CategoryPickerProps {
  stage: BabyStage;
  onSelectCategory: (category: CardCategory | 'all') => void;
  onBack: () => void;
}

export const CategoryPicker: React.FC<CategoryPickerProps> = ({
  stage,
  onSelectCategory,
  onBack,
}) => {
  const stageInfo = STAGE_DEFINITIONS[stage];

  // Filter cards belonging to this stage
  const stageCards = CARD_LIBRARY.filter((c) => c.stage === stage);

  // Icon mapper
  const getCategoryIcon = (category: CardCategory) => {
    switch (category) {
      case 'shapes':
        return <Square className="w-6 h-6 text-white" />;
      case 'faces':
        return <Smile className="w-6 h-6 text-white" />;
      case 'patterns':
        return <Disc className="w-6 h-6 text-white" />;
      case 'animals':
        return <Cat className="w-6 h-6 text-white" />;
      case 'objects':
        return <Sparkles className="w-6 h-6 text-white" />;
      default:
        return <Layers className="w-6 h-6 text-white" />;
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* Top stage breadcrumb & Back Button */}
      <div className="flex items-center justify-between gap-3">
        <button
          id="back-to-stages-btn"
          onClick={onBack}
          className="h-11 px-3 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition active:scale-95"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Change Age</span>
        </button>

        <span className="text-xs font-bold uppercase tracking-wider text-red-400 bg-red-950/60 border border-red-800/60 px-3 py-1 rounded-full">
          Stage {stage} • {stageInfo.ageLabel}
        </span>
      </div>

      {/* Screen Title */}
      <div className="space-y-1">
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Choose a Card Deck
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400">
          Showing categories scientifically tailored for {stageInfo.ageLabel}.
        </p>
      </div>

      {/* "Play All" Instant Launch Button (Achieves 2 taps to first card!) */}
      <button
        id="play-all-stage-cards-btn"
        onClick={() => onSelectCategory('all')}
        className="w-full min-h-[72px] p-4 rounded-3xl bg-white hover:bg-neutral-200 active:scale-[0.99] text-black font-black text-base transition-all shadow-xl flex items-center justify-between gap-4 group"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center font-bold">
            <Play className="w-5 h-5 fill-white ml-0.5" />
          </div>
          <div className="text-left">
            <p className="text-base sm:text-lg font-black leading-tight">Play All {stageCards.length} Cards</p>
            <p className="text-xs font-semibold text-neutral-700">Combined full-spectrum session</p>
          </div>
        </div>

        <span className="text-xs uppercase font-extrabold tracking-wider bg-neutral-900 text-white px-3 py-1.5 rounded-xl">
          Quick Start
        </span>
      </button>

      {/* Category Grid (large icon buttons, ≤5 items) */}
      <div className="space-y-3">
        {stageInfo.validCategories.map((catKey) => {
          const catInfo = CATEGORY_INFO[catKey];
          const cardsInCat = stageCards.filter((c) => c.category === catKey);
          const sampleCard = cardsInCat[0];

          return (
            <button
              key={catKey}
              id={`select-category-${catKey}-btn`}
              onClick={() => onSelectCategory(catKey)}
              className="w-full min-h-[84px] p-4 rounded-3xl bg-neutral-900/90 hover:bg-neutral-850 border-2 border-neutral-800 hover:border-neutral-600 active:scale-[0.99] text-left transition-all shadow-md group flex items-center justify-between gap-3.5"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                {/* Visual Preview or Category Icon */}
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-white border border-neutral-700 overflow-hidden shrink-0 flex items-center justify-center p-1 group-hover:scale-105 transition-transform">
                  {sampleCard ? (
                    <CardSvgRenderer card={sampleCard} className="w-full h-full" />
                  ) : (
                    getCategoryIcon(catKey)
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-white capitalize">
                      {catInfo.label}
                    </h3>
                    <span className="text-[11px] font-bold text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded-full">
                      {cardsInCat.length} cards
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 truncate mt-0.5 max-w-xs">
                    {catInfo.summary}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="shrink-0">
                <div className="w-10 h-10 rounded-2xl bg-neutral-800 group-hover:bg-white group-hover:text-black text-white flex items-center justify-center transition-colors">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Placement tip */}
      <div className="bg-black/60 border border-neutral-800 rounded-3xl p-4 text-xs text-neutral-400 flex items-center gap-3">
        <Eye className="w-4 h-4 text-neutral-400 shrink-0" />
        <p>
          Prop your screen <strong className="text-white">{stageInfo.focalDistance}</strong> from baby's eyes during play or tummy time.
        </p>
      </div>
    </div>
  );
};
