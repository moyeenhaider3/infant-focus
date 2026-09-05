import React from 'react';
import { Eye, Calendar, Heart } from 'lucide-react';
import { BabyStage } from '../types';

interface NavbarProps {
  currentStage?: BabyStage | null;
  onOpenProgress: () => void;
  onOpenStory?: () => void;
  onShowDistanceReminder?: () => void;
  onGoHome?: () => void;
  hideBrandOnMobile?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentStage,
  onOpenProgress,
  onOpenStory,
  onShowDistanceReminder,
  onGoHome,
}) => {
  return (
    <header
      id="app-header"
      className="w-full bg-black/90 border-b border-neutral-800 text-white backdrop-blur-md px-4 sm:px-6 py-3 sticky top-0 z-40"
    >
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
        {/* Brand logo / home link */}
        <button
          id="nav-logo-btn"
          onClick={onGoHome}
          className="flex items-center gap-2.5 text-left group rounded-xl p-1 -m-1 focus:outline-none focus:ring-2 focus:ring-white"
        >
          <div className="w-9 h-9 rounded-xl bg-white text-black flex items-center justify-center font-black text-base shadow-sm group-hover:scale-105 transition-transform">
            <span className="tracking-tighter">B&W</span>
          </div>
          <div>
            <span className="text-sm sm:text-base font-black tracking-tight text-white block leading-tight">
              Infant Focus
            </span>
            <span className="text-[10px] sm:text-xs text-neutral-400 block tracking-wide">
              0–4m Visual Development
            </span>
          </div>
        </button>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Dedication / Story button */}
          {onOpenStory && (
            <button
              id="nav-story-btn"
              onClick={onOpenStory}
              className="h-10 px-3 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-rose-900/80 hover:bg-rose-950/30 text-neutral-300 hover:text-rose-200 text-xs font-semibold flex items-center gap-1.5 transition active:scale-95"
              title="Made with love for Mohammad Hasnain • Read story"
            >
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span className="hidden sm:inline">Our Story</span>
            </button>
          )}

          {/* Distance reminder button */}
          {onShowDistanceReminder && (
            <button
              id="nav-distance-btn"
              onClick={onShowDistanceReminder}
              className="h-10 px-3 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition active:scale-95"
              title="View recommended screen distance"
            >
              <Eye className="w-4 h-4 text-red-500" />
              <span className="hidden sm:inline">8–12 in</span>
            </button>
          )}

          {/* Weekly Progress button */}
          <button
            id="nav-progress-btn"
            onClick={onOpenProgress}
            className="h-10 px-3.5 rounded-xl bg-white hover:bg-neutral-200 text-black text-xs font-bold flex items-center gap-1.5 transition active:scale-95 shadow-sm"
          >
            <Calendar className="w-4 h-4" />
            <span>Progress Log</span>
          </button>
        </div>
      </div>
    </header>
  );
};
