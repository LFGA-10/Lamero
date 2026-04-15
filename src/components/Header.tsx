import { Leaf, Smile, ChevronRight, User } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  onTabChange?: (tab: any) => void;
}

const Header = ({ onTabChange }: HeaderProps) => {
  const { t, selectedMood } = useLanguage();
  const navigate = useNavigate();

  return (
    <header className="h-20 flex items-center justify-between px-6 glass-strong border-b-brand-tan/10 sticky top-0 z-30 shadow-sm">
      <div className="flex items-center gap-2">
         <div className="w-10 h-10 flex items-center justify-center">
            <span className="text-brand-tan"><Leaf size={28} /></span>
         </div>
         <h1 className="font-display text-3xl font-extrabold tracking-tighter text-brand-tan italic uppercase">
            Lumora
         </h1>
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={() => navigate("/mood-selection")}
          className="flex items-center gap-2 bg-background/50 dark:bg-card/50 border border-brand-tan/20 rounded-full px-4 py-2 hover:bg-brand-tan/5 transition-all shadow-sm active:scale-95"
        >
          {selectedMood ? (
             <span className="text-xl">{selectedMood.emoji}</span>
          ) : (
             <Smile size={18} className="text-brand-text/60 dark:text-brand-soft/60" />
          )}
          <span className="text-sm font-bold text-brand-text-dark">
            {selectedMood ? t(selectedMood.label) : t('current_mood')}
          </span>
          <ChevronRight size={14} className="opacity-40" />
        </button>

        <button 
          onClick={() => onTabChange?.("profile")}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-background/50 dark:bg-card/50 border border-brand-tan/20 text-brand-tan hover:bg-brand-tan/5 transition-all active:scale-90"
          aria-label="Profile"
        >
          <User size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
