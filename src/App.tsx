import React, { useState } from 'react';
import {
  HashRouter,
  Routes,
  Route,
  useNavigate,
  useParams,
  Navigate,
} from 'react-router-dom';
import { Heart } from 'lucide-react';
import { BabyStage, CardCategory } from './types';
import { Navbar } from './components/Navbar';
import { StageSelector } from './components/StageSelector';
import { CategoryPicker } from './components/CategoryPicker';
import { CardPlayer } from './components/CardPlayer';
import { ProgressModal } from './components/ProgressModal';
import { StoryModal } from './components/StoryModal';
import { DistanceBanner } from './components/DistanceBanner';
import { loadLastState, saveLastState } from './utils/storage';

// Screen 1 Wrapper: Landing screen
const LandingScreen: React.FC<{
  onOpenProgress: () => void;
  onOpenStory: () => void;
}> = ({ onOpenProgress, onOpenStory }) => {
  const navigate = useNavigate();
  const lastState = loadLastState();

  const handleSelectStage = (stage: BabyStage) => {
    navigate(`/stage/${stage}`);
  };

  const handleQuickStart = (stage: BabyStage, category: CardCategory | 'all') => {
    saveLastState(stage, category);
    navigate(`/play/${stage}/${category}`);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between">
      <Navbar
        onOpenProgress={onOpenProgress}
        onOpenStory={onOpenStory}
        onGoHome={() => navigate('/')}
      />
      <main className="flex-1 flex items-center justify-center">
        <StageSelector
          onSelectStage={handleSelectStage}
          onQuickStart={handleQuickStart}
          lastState={lastState}
          onOpenStory={onOpenStory}
        />
      </main>
      <footer className="py-4 px-4 text-center text-xs text-neutral-400 border-t border-neutral-900/80 space-y-1.5">
        <div>
          <button
            id="footer-story-btn"
            onClick={onOpenStory}
            className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-rose-300 transition group p-1 rounded-lg"
          >
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 group-hover:scale-125 transition-transform" />
            <span>by a father for <strong className="text-white underline decoration-rose-500/50 underline-offset-2">Mohammad Hasnain</strong> (born 23 Aug 2026, 6:42 PM)</span>
            <span className="text-rose-400 font-bold ml-1 group-hover:underline">• Our Story</span>
          </button>
        </div>
        <p className="text-[11px] text-neutral-500">
          Infant Visual Development Flashcards • Based on Fantz (1961) & Cone Photoreceptor Science
        </p>
      </footer>
    </div>
  );
};

// Screen 2 Wrapper: Category screen
const CategoryScreen: React.FC<{
  onOpenProgress: () => void;
  onOpenStory: () => void;
}> = ({ onOpenProgress, onOpenStory }) => {
  const navigate = useNavigate();
  const { stageId } = useParams<{ stageId: string }>();
  const parsedStage = Number(stageId) as BabyStage;
  const validStage: BabyStage = [1, 2, 3, 4].includes(parsedStage) ? parsedStage : 1;

  const handleSelectCategory = (category: CardCategory | 'all') => {
    saveLastState(validStage, category);
    navigate(`/play/${validStage}/${category}`);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between">
      <Navbar
        currentStage={validStage}
        onOpenProgress={onOpenProgress}
        onOpenStory={onOpenStory}
        onGoHome={() => navigate('/')}
      />
      <main className="flex-1 flex items-center justify-center">
        <CategoryPicker
          stage={validStage}
          onSelectCategory={handleSelectCategory}
          onBack={() => navigate('/')}
        />
      </main>
      <footer className="py-4 px-4 text-center text-xs text-neutral-400 border-t border-neutral-900/80 space-y-1.5">
        <div>
          <button
            onClick={onOpenStory}
            className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-rose-300 transition group p-1 rounded-lg"
          >
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 group-hover:scale-125 transition-transform" />
            <span>by a father for <strong className="text-white underline decoration-rose-500/50 underline-offset-2">Mohammad Hasnain</strong> (born 23 Aug 2026, 6:42 PM)</span>
          </button>
        </div>
        <p className="text-[11px] text-neutral-500">
          Hold 8–12 inches from baby's eyes • Keep sessions to 2–3 minutes
        </p>
      </footer>
    </div>
  );
};

// Screen 3 Wrapper: Card Player
const PlayerScreen: React.FC<{
  onOpenProgress: () => void;
}> = ({ onOpenProgress }) => {
  const navigate = useNavigate();
  const { stageId, categoryId } = useParams<{ stageId: string; categoryId: string }>();

  const parsedStage = Number(stageId) as BabyStage;
  const validStage: BabyStage = [1, 2, 3, 4].includes(parsedStage) ? parsedStage : 1;
  const validCategory = (categoryId as CardCategory | 'all') || 'all';

  return (
    <CardPlayer
      stage={validStage}
      category={validCategory}
      onExit={() => navigate(`/stage/${validStage}`)}
      onViewProgress={onOpenProgress}
    />
  );
};

export default function App() {
  const [isProgressOpen, setIsProgressOpen] = useState(false);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [showGlobalDistanceReminder, setShowGlobalDistanceReminder] = useState(false);

  return (
    <HashRouter>
      {/* Global distance guideline toast banner if triggered */}
      {showGlobalDistanceReminder && (
        <DistanceBanner
          distanceText="8–12 inches (20–30 cm)"
          onDismiss={() => setShowGlobalDistanceReminder(false)}
        />
      )}

      {/* Progress Motivation Modal */}
      <ProgressModal
        isOpen={isProgressOpen}
        onClose={() => setIsProgressOpen(false)}
      />

      {/* The Story & Father's Dedication Modal */}
      <StoryModal
        isOpen={isStoryOpen}
        onClose={() => setIsStoryOpen(false)}
      />

      <Routes>
        <Route
          path="/"
          element={
            <LandingScreen
              onOpenProgress={() => setIsProgressOpen(true)}
              onOpenStory={() => setIsStoryOpen(true)}
            />
          }
        />
        <Route
          path="/stage/:stageId"
          element={
            <CategoryScreen
              onOpenProgress={() => setIsProgressOpen(true)}
              onOpenStory={() => setIsStoryOpen(true)}
            />
          }
        />
        <Route
          path="/play/:stageId/:categoryId"
          element={<PlayerScreen onOpenProgress={() => setIsProgressOpen(true)} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}
