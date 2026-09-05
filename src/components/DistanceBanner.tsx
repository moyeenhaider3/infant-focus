import React, { useState, useEffect } from 'react';
import { Eye, X } from 'lucide-react';

interface DistanceBannerProps {
  distanceText?: string;
  onDismiss?: () => void;
}

export const DistanceBanner: React.FC<DistanceBannerProps> = ({
  distanceText = '8–12 inches (20–30 cm)',
  onDismiss,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Auto fade after 9 seconds if not clicked
    const timer = setTimeout(() => {
      setVisible(false);
      onDismiss?.();
    }, 9000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  if (!visible) return null;

  return (
    <div
      id="distance-reminder-banner"
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-md bg-neutral-900/95 border-2 border-neutral-700 text-white px-4 py-3 rounded-2xl shadow-2xl backdrop-blur-md flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top duration-300"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center shrink-0 font-bold">
          <Eye className="w-5 h-5" />
        </div>
        <div className="text-left">
          <p className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">Recommended Placement</p>
          <p className="text-sm font-bold text-white">
            Hold or prop screen <span className="underline decoration-red-500 underline-offset-2">{distanceText}</span> from baby
          </p>
        </div>
      </div>
      <button
        id="dismiss-distance-btn"
        onClick={() => {
          setVisible(false);
          onDismiss?.();
        }}
        className="shrink-0 p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
        aria-label="Dismiss reminder"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};
