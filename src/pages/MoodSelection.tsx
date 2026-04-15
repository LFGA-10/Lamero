import { useNavigate } from "react-router-dom";
import DynamicBackground from "@/components/DynamicBackground";
import { useLanguage, Mood } from "@/context/LanguageContext";
import { ChevronRight } from "lucide-react";

const moods: Mood[] = [
  { label: "Radiant", emoji: "😊", color: "bg-yellow-50" },
  { label: "Peaceful", emoji: "😌", color: "bg-green-50" },
  { label: "Tired", emoji: "😴", color: "bg-blue-50" },
  { label: "Anxious", emoji: "😰", color: "bg-amber-50" },
  { label: "Sad", emoji: "😭", color: "bg-indigo-50" },
  { label: "Reflective", emoji: "🤔", color: "bg-purple-50" },
];

const MoodSelection = () => {
  const { setMood, t } = useLanguage();
  const navigate = useNavigate();

  const handleMoodSelect = (mood: Mood) => {
    setMood(mood);
    navigate("/home");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden">
      <DynamicBackground />
      <div className="w-full max-w-lg z-10 space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="text-center space-y-3">
           <h2 className="text-4xl font-display font-bold italic text-brand-text-dark leading-tight">
             {t('how_feeling')}
           </h2>
           <p className="text-[10px] font-black text-brand-text/30 uppercase tracking-[0.3em]">{t('select_energy')}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {moods.map((mood, i) => (
            <button
              key={mood.label}
              onClick={() => handleMoodSelect(mood)}
              className={`${mood.color} p-8 rounded-[2.5rem] flex flex-col items-center gap-4 transition-all hover:scale-[1.05] shadow-sm active:scale-95 group border-none min-h-[160px] animate-in fade-in zoom-in`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <span className="text-4xl transform group-hover:scale-110 transition-transform duration-500">
                {mood.emoji}
              </span>
              <div className="space-y-1">
                 <p className="font-display font-bold text-lg text-brand-text-dark italic">
                   {t(mood.label)}
                 </p>
              </div>
            </button>
          ))}
        </div>

        <div className="flex justify-center pt-4">
           <button 
             onClick={() => navigate("/home")}
             className="text-[10px] font-black text-brand-text/30 uppercase tracking-[0.3em] hover:text-brand-tan transition-colors"
           >
              {t('skip')}
           </button>
        </div>
      </div>
    </div>
  );
};

export default MoodSelection;
