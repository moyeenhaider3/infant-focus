import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CardCategory, CardItem, BabyStage } from '../types';
import { STAGE_DEFINITIONS, CARD_LIBRARY } from '../data/cards';
import { CardSvgRenderer } from './CardSvgRenderer';
import { ScienceModal } from './ScienceModal';
import { SessionEndModal } from './SessionEndModal';
import { DistanceBanner } from './DistanceBanner';
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Info,
  Sliders,
  MoveHorizontal,
  Maximize,
  Minimize,
  Volume2,
  VolumeX,
  Contrast,
  X,
  Timer,
  Sparkles,
} from 'lucide-react';
import {
  loadPreferences,
  savePreferences,
  logSession,
  playSoftChime,
} from '../utils/storage';

interface CardPlayerProps {
  stage: BabyStage;
  category: CardCategory | 'all';
  onExit: () => void;
  onViewProgress: () => void;
}

export const CardPlayer: React.FC<CardPlayerProps> = ({
  stage,
  category,
  onExit,
  onViewProgress,
}) => {
  const stageInfo = STAGE_DEFINITIONS[stage];

  // Filter cards for the chosen stage & category
  const deckCards = React.useMemo(() => {
    let cards = CARD_LIBRARY.filter((c) => c.stage === stage);
    if (category !== 'all') {
      cards = cards.filter((c) => c.category === category);
    }
    // Fallback if empty
    if (cards.length === 0) {
      cards = CARD_LIBRARY.filter((c) => c.stage === stage);
    }
    return cards;
  }, [stage, category]);

  // Preferences from storage
  const [prefs, setPrefs] = useState(loadPreferences);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [isTrackingMode, setIsTrackingMode] = useState(prefs.trackingMode);
  const [isInverted, setIsInverted] = useState(prefs.invertedColors);
  const [soundEnabled, setSoundEnabled] = useState(prefs.soundCue);
  const [autoAdvanceSec, setAutoAdvanceSec] = useState(prefs.autoAdvanceSeconds); // 5, 7, or 10s
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');

  // UI Modals
  const [showScienceModal, setShowScienceModal] = useState(false);
  const [showSessionEndModal, setShowSessionEndModal] = useState(false);
  const [showSettingsDrawer, setShowSettingsDrawer] = useState(false);
  const [showDistanceBanner, setShowDistanceBanner] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Touch gesture state
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const sessionLimitSeconds = prefs.sessionLimitMinutes * 60; // default 180s (3 min)

  const currentCard = deckCards[currentIndex] || deckCards[0];

  // Navigation handlers
  const handleNextCard = useCallback(() => {
    setSlideDirection('right');
    setCurrentIndex((prev) => (prev + 1) % deckCards.length);
    if (soundEnabled) playSoftChime();
  }, [deckCards.length, soundEnabled]);

  const handlePrevCard = useCallback(() => {
    setSlideDirection('left');
    setCurrentIndex((prev) => (prev - 1 + deckCards.length) % deckCards.length);
    if (soundEnabled) playSoftChime();
  }, [deckCards.length, soundEnabled]);

  // Auto-advance timer logic
  useEffect(() => {
    if (!isPlaying || showSessionEndModal || showScienceModal) return;

    const interval = setInterval(() => {
      handleNextCard();
    }, autoAdvanceSec * 1000);

    return () => clearInterval(interval);
  }, [isPlaying, autoAdvanceSec, handleNextCard, showSessionEndModal, showScienceModal]);

  // Overall 3-minute session timer logic (soft stop)
  useEffect(() => {
    if (showSessionEndModal) return;

    const sessionTimer = setInterval(() => {
      setSessionSeconds((prev) => {
        const nextVal = prev + 1;
        if (nextVal >= sessionLimitSeconds) {
          // Soft stop trigger at 3 minutes!
          setIsPlaying(false);
          setShowSessionEndModal(true);
          // Log session
          logSession({
            stage,
            category,
            durationSeconds: nextVal,
            completedCardsCount: currentIndex + 1,
          });
        }
        return nextVal;
      });
    }, 1000);

    return () => clearInterval(sessionTimer);
  }, [sessionLimitSeconds, showSessionEndModal, stage, category, currentIndex]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showScienceModal || showSessionEndModal) return;
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleNextCard();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevCard();
      } else if (e.key === 'p') {
        setIsPlaying((prev) => !prev);
      } else if (e.key === 't') {
        toggleTracking();
      } else if (e.key === 'i') {
        setShowScienceModal(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNextCard, handlePrevCard, showScienceModal, showSessionEndModal]);

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartXRef.current || !touchEndXRef.current) return;
    const diff = touchStartXRef.current - touchEndXRef.current;
    if (diff > 45) {
      // Swiped left -> next card
      handleNextCard();
    } else if (diff < -45) {
      // Swiped right -> prev card
      handlePrevCard();
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  const toggleTracking = () => {
    const next = !isTrackingMode;
    setIsTrackingMode(next);
    savePreferences({ trackingMode: next });
  };

  const toggleInverted = () => {
    const next = !isInverted;
    setIsInverted(next);
    savePreferences({ invertedColors: next });
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    savePreferences({ soundCue: next });
  };

  const handleChangeSpeed = (sec: number) => {
    setAutoAdvanceSec(sec);
    savePreferences({ autoAdvanceSeconds: sec });
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Format session timer display
  const sessionMin = Math.floor(sessionSeconds / 60);
  const sessionRemSec = sessionSeconds % 60;
  const timerDisplay = `${sessionMin}:${sessionRemSec < 10 ? '0' : ''}${sessionRemSec}`;
  const progressPercent = Math.min(100, (sessionSeconds / sessionLimitSeconds) * 100);

  return (
    <div
      ref={containerRef}
      id="card-player-root"
      className={`fixed inset-0 z-40 flex flex-col justify-between select-none overflow-hidden transition-colors duration-300 ${
        isInverted ? 'bg-black text-white' : 'bg-white text-black'
      }`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 8-12 Inches Distance Reminder (Shown once per session) */}
      {showDistanceBanner && (
        <DistanceBanner
          distanceText={stageInfo.focalDistance}
          onDismiss={() => setShowDistanceBanner(false)}
        />
      )}

      {/* ---------------------------------------------------- */}
      {/* PARENT TOP CONTROLS BAR (Distraction-free, crisp contrast) */}
      {/* ---------------------------------------------------- */}
      <header className="relative z-30 w-full px-4 sm:px-6 py-3 flex items-center justify-between gap-2 bg-gradient-to-b from-black/80 via-black/40 to-transparent text-white">
        {/* Left: Exit button & Stage Pill */}
        <div className="flex items-center gap-2">
          <button
            id="exit-player-btn"
            onClick={onExit}
            className="h-11 px-3.5 rounded-2xl bg-neutral-900/90 border border-neutral-700/80 hover:bg-neutral-800 text-white font-bold text-xs flex items-center gap-1.5 transition active:scale-95 shadow-md"
            aria-label="Exit card deck"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Exit Deck</span>
          </button>

          <span className="text-xs font-black uppercase tracking-wider text-red-400 bg-red-950/70 border border-red-800/80 px-2.5 py-1 rounded-full shadow-sm">
            Stage {stage}
          </span>
        </div>

        {/* Center: Session 3-Min Progress Indicator */}
        <div className="flex items-center gap-2 bg-neutral-900/90 border border-neutral-700/80 px-3.5 py-1.5 rounded-full shadow-md">
          <Timer className="w-3.5 h-3.5 text-neutral-300 animate-pulse" />
          <span className="text-xs font-mono font-bold text-white tracking-wider">
            {timerDisplay} / 3:00
          </span>
          {/* Micro progress bar */}
          <div className="w-12 h-1.5 bg-neutral-800 rounded-full overflow-hidden ml-1">
            <div
              className="h-full bg-emerald-400 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Right: Science info ⓘ, Tracking Mode, & Settings Drawer */}
        <div className="flex items-center gap-1.5">
          {/* Science info button (Must-have requirement) */}
          <button
            id="card-science-info-btn"
            onClick={() => setShowScienceModal(true)}
            className="w-11 h-11 rounded-2xl bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700/80 text-white flex items-center justify-center transition active:scale-95 shadow-md"
            title="Why this card helps (Research note)"
            aria-label="Why this card helps"
          >
            <Info className="w-5 h-5 text-amber-400" />
          </button>

          {/* Tracking Mode quick toggle button */}
          <button
            id="toggle-tracking-mode-btn"
            onClick={toggleTracking}
            className={`h-11 px-3 rounded-2xl border font-bold text-xs flex items-center gap-1.5 transition active:scale-95 shadow-md ${
              isTrackingMode
                ? 'bg-red-600 border-red-500 text-white'
                : 'bg-neutral-900/90 border-neutral-700/80 text-neutral-300 hover:text-white'
            }`}
            title="Toggle lateral tracking motion for tummy time"
          >
            <MoveHorizontal className="w-4 h-4" />
            <span className="hidden md:inline">Tracking</span>
          </button>

          {/* Extra player options toggle */}
          <button
            id="player-options-toggle-btn"
            onClick={() => setShowSettingsDrawer((prev) => !prev)}
            className="w-11 h-11 rounded-2xl bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700/80 text-white flex items-center justify-center transition active:scale-95 shadow-md"
            title="Player settings"
            aria-label="Player settings"
          >
            <Sliders className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ---------------------------------------------------- */}
      {/* SETTINGS DRAWER OVERLAY (Speed, Invert, Audio, Fullscreen) */}
      {/* ---------------------------------------------------- */}
      {showSettingsDrawer && (
        <div
          id="player-settings-drawer"
          className="absolute top-16 right-4 z-50 w-72 bg-neutral-900/95 border-2 border-neutral-700 text-white p-4 rounded-3xl shadow-2xl backdrop-blur-md space-y-4 animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
            <span className="text-xs uppercase font-bold text-neutral-400 tracking-wider">
              Display & Timing
            </span>
            <button
              onClick={() => setShowSettingsDrawer(false)}
              className="text-neutral-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Auto advance speed selector: 5s, 7s, 10s */}
          <div>
            <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
              Auto-flip Interval
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {[5, 7, 10].map((sec) => (
                <button
                  key={sec}
                  onClick={() => handleChangeSpeed(sec)}
                  className={`py-2 text-xs font-bold rounded-xl transition ${
                    autoAdvanceSec === sec
                      ? 'bg-white text-black font-extrabold'
                      : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                  }`}
                >
                  {sec}s
                </button>
              ))}
            </div>
          </div>

          {/* Invert contrast toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Contrast className="w-4 h-4 text-neutral-400" />
              <span className="text-xs font-medium text-neutral-200">Invert High Contrast</span>
            </div>
            <button
              onClick={toggleInverted}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                isInverted ? 'bg-white text-black' : 'bg-neutral-800 text-neutral-300'
              }`}
            >
              {isInverted ? 'White/Black' : 'Black/White'}
            </button>
          </div>

          {/* Gentle chime sound toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-neutral-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-neutral-400" />
              )}
              <span className="text-xs font-medium text-neutral-200">Flip Sound Chime</span>
            </div>
            <button
              onClick={toggleSound}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                soundEnabled ? 'bg-emerald-600 text-white' : 'bg-neutral-800 text-neutral-400'
              }`}
            >
              {soundEnabled ? 'On' : 'Off'}
            </button>
          </div>

          {/* Fullscreen button */}
          <div className="pt-1">
            <button
              onClick={toggleFullscreen}
              className="w-full py-2.5 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition"
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
              <span>{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen (For Stand)'}</span>
            </button>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* MAIN FLASHCARD STAGE (Full-bleed, responsive, SVG rendered) */}
      {/* ---------------------------------------------------- */}
      <main className="relative flex-1 w-full h-full flex items-center justify-center p-4 sm:p-8 overflow-hidden">
        {/* Optional Tracking Mode: slow lateral slide motion */}
        <motion.div
          animate={
            isTrackingMode
              ? {
                  x: ['-20%', '20%', '-20%'],
                }
              : { x: 0 }
          }
          transition={
            isTrackingMode
              ? {
                  repeat: Infinity,
                  duration: 8.5,
                  ease: 'easeInOut',
                }
              : { duration: 0.3 }
          }
          className="relative w-full h-full max-w-2xl max-h-[75vh] sm:max-h-[82vh] aspect-square flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCard.id}
              initial={{
                opacity: 0,
                scale: 0.96,
                x: slideDirection === 'right' ? 40 : -40,
              }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{
                opacity: 0,
                scale: 0.96,
                x: slideDirection === 'right' ? -40 : 40,
              }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="w-full h-full flex items-center justify-center rounded-3xl overflow-hidden shadow-2xl p-2 sm:p-4"
              style={{
                backgroundColor: isInverted ? '#000000' : '#FFFFFF',
              }}
            >
              <CardSvgRenderer
                card={currentCard}
                inverted={isInverted}
                className="w-full h-full"
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Large overlay tap zones for next/previous on touchscreen */}
        <div
          id="tap-left-previous-zone"
          onClick={handlePrevCard}
          className="absolute left-0 top-16 bottom-20 w-1/4 z-20 cursor-pointer opacity-0 hover:opacity-100 transition-opacity flex items-center pl-4"
          aria-label="Previous card tap area"
        >
          <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center shadow-lg">
            <ChevronLeft className="w-6 h-6" />
          </div>
        </div>

        <div
          id="tap-right-next-zone"
          onClick={handleNextCard}
          className="absolute right-0 top-16 bottom-20 w-1/4 z-20 cursor-pointer opacity-0 hover:opacity-100 transition-opacity flex items-center justify-end pr-4"
          aria-label="Next card tap area"
        >
          <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center shadow-lg">
            <ChevronRight className="w-6 h-6" />
          </div>
        </div>
      </main>

      {/* ---------------------------------------------------- */}
      {/* PARENT BOTTOM CONTROLS BAR (48px+ touch targets, simple, elegant) */}
      {/* ---------------------------------------------------- */}
      <footer className="relative z-30 w-full px-4 sm:px-6 py-4 flex items-center justify-between gap-3 bg-gradient-to-t from-black/80 via-black/50 to-transparent text-white">
        {/* Left: Card title & count badge */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="min-w-0">
            <h4 className="text-sm sm:text-base font-black text-white truncate drop-shadow-sm">
              {currentCard.title}
            </h4>
            <div className="flex items-center gap-2 text-xs text-neutral-300">
              <span className="font-semibold uppercase tracking-wider text-[11px] text-red-400">
                {currentCard.category}
              </span>
              <span>•</span>
              <span className="font-mono text-neutral-400">
                {currentIndex + 1} of {deckCards.length}
              </span>
            </div>
          </div>
        </div>

        {/* Center/Right: Prev, Play/Pause, Next Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Previous Card Button */}
          <button
            id="card-prev-btn"
            onClick={handlePrevCard}
            className="w-12 h-12 rounded-2xl bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700/80 active:scale-95 text-white flex items-center justify-center transition shadow-md"
            aria-label="Previous card"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Auto-Advance Play/Pause Button */}
          <button
            id="card-play-pause-btn"
            onClick={() => setIsPlaying((prev) => !prev)}
            className="h-12 px-4 rounded-2xl bg-white hover:bg-neutral-200 active:scale-95 text-black font-extrabold text-xs sm:text-sm flex items-center gap-2 transition shadow-xl"
            aria-label={isPlaying ? 'Pause auto advance' : 'Resume auto advance'}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-black" />
                <span className="hidden sm:inline">Pause ({autoAdvanceSec}s)</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-black ml-0.5" />
                <span className="hidden sm:inline">Play Deck</span>
              </>
            )}
          </button>

          {/* Next Card Button */}
          <button
            id="card-next-btn"
            onClick={handleNextCard}
            className="w-12 h-12 rounded-2xl bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700/80 active:scale-95 text-white flex items-center justify-center transition shadow-md"
            aria-label="Next card"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </footer>

      {/* Science Info Tooltip/Modal */}
      <ScienceModal
        card={currentCard}
        isOpen={showScienceModal}
        onClose={() => setShowScienceModal(false)}
      />

      {/* 3-Minute Session Soft Stop Modal */}
      <SessionEndModal
        isOpen={showSessionEndModal}
        durationSeconds={sessionSeconds}
        cardsCount={currentIndex + 1}
        onContinue={() => {
          setShowSessionEndModal(false);
          setIsPlaying(true);
        }}
        onFinish={onExit}
        onViewProgress={() => {
          setShowSessionEndModal(false);
          onViewProgress();
        }}
      />
    </div>
  );
};
