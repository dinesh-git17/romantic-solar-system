// src/components/UI/EnableSoundButton.tsx
// Prompt displayed when browser blocks autoplay

import { Volume2 } from "lucide-react";

interface EnableSoundButtonProps {
  onEnable: () => void;
}

export const EnableSoundButton: React.FC<EnableSoundButtonProps> = ({
  onEnable,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <button
        onClick={onEnable}
        className="px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white font-medium hover:bg-white/15 hover:border-white/30 transition-all duration-300 flex items-center gap-3 shadow-2xl animate-pulse pointer-events-auto group"
        aria-label="Enable sound"
      >
        <Volume2 className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
        <span>Click to Enable Sound</span>
      </button>
    </div>
  );
};
