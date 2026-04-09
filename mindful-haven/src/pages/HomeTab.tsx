import { useState, useEffect, useMemo } from "react";
import DynamicBackground from "@/components/DynamicBackground";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Play, 
  ChevronRight, 
  Library, 
  Flower2, 
  MessageCircle, 
  Music,
  Heart,
  Sparkles,
  CheckCircle2,
  Tent
} from "lucide-react";

interface ContentSet {
  quotes: { textKey: string; author: string }[];
  playlist: { titleKey: string; artist: string; youtube: string; icon: any; color: string; descKey: string };
  reflection: { titleKey: string; textKey: string; icon: any; color: string };
}

const moodContent: Record<string, ContentSet> = {
  Radiant: {
    quotes: [{ textKey: "quote_1", author: "Lumora" }, { textKey: "quote_2", author: "Sanctuary" }],
    playlist: { titleKey: "Radiant Vibes", artist: "Pharrell", youtube: "https://www.youtube.com/results?search_query=happy", icon: Sparkles, color: "bg-yellow-100", descKey: "playlist_desc" },
    reflection: { titleKey: "reflection_title", textKey: "reflection_text", icon: Flower2, color: "bg-yellow-50" }
  },
  Sad: {
    quotes: [{ textKey: "quote_1", author: "Lumora" }, { textKey: "quote_2", author: "Sanctuary" }],
    playlist: { titleKey: "Gentle Comfort", artist: "Bon Iver", youtube: "https://www.youtube.com/results?search_query=bon+iver", icon: Heart, color: "bg-indigo-100", descKey: "playlist_desc" },
    reflection: { titleKey: "reflection_title", textKey: "reflection_text", icon: Heart, color: "bg-indigo-50" }
  },
  Anxious: {
    quotes: [{ textKey: "quote_1", author: "Lumora" }, { textKey: "quote_2", author: "Sanctuary" }],
    playlist: { titleKey: "Peaceful Stillness", artist: "Nature", youtube: "https://www.youtube.com/results?search_query=calm+nature", icon: Tent, color: "bg-amber-100", descKey: "playlist_desc" },
    reflection: { titleKey: "reflection_title", textKey: "reflection_text", icon: Sparkles, color: "bg-amber-50" }
  },
  Tired: {
    quotes: [{ textKey: "quote_2", author: "Lumora" }, { textKey: "quote_1", author: "Sanctuary" }],
    playlist: { titleKey: "Lo-Fi Rest", artist: "Lofi Girl", youtube: "https://www.youtube.com/results?search_query=lofi", icon: Music, color: "bg-blue-100", descKey: "playlist_desc" },
    reflection: { titleKey: "reflection_title", textKey: "reflection_text", icon: Sparkles, color: "bg-blue-50" }
  },
  Peaceful: {
    quotes: [{ textKey: "quote_1", author: "Lumora" }, { textKey: "quote_2", author: "Sanctuary" }],
    playlist: { titleKey: "Evening Calm", artist: "Ambient", youtube: "https://www.youtube.com/results?search_query=ambient+peace", icon: Flower2, color: "bg-green-100", descKey: "playlist_desc" },
    reflection: { titleKey: "reflection_title", textKey: "reflection_text", icon: Flower2, color: "bg-green-50" }
  },
  Reflective: {
    quotes: [{ textKey: "quote_1", author: "Lumora" }, { textKey: "quote_2", author: "Sanctuary" }],
    playlist: { titleKey: "Soul Search", artist: "Max Richter", youtube: "https://www.youtube.com/results?search_query=max+richter", icon: Library, color: "bg-purple-100", descKey: "playlist_desc" },
    reflection: { titleKey: "reflection_title", textKey: "reflection_text", icon: Sparkles, color: "bg-purple-50" }
  }
};

const defaultContent: ContentSet = moodContent.Anxious;

const HomeTab = () => {
  const { t, selectedMood } = useLanguage();
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const content = useMemo(() => {
    return selectedMood ? (moodContent[selectedMood.label] || defaultContent) : defaultContent;
  }, [selectedMood]);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % content.quotes.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [content]);

  return (
    <div className="space-y-8 pb-10 relative">
      <div className="relative z-10 space-y-8">
        <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-xl aspect-[16/7] group bg-brand-tan/10">
            <img 
              src={`https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=800`} 
              className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 opacity-60"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-8 text-center backdrop-blur-[1px]">
              <div className="relative w-full overflow-hidden h-32 flex items-center justify-center">
                {content.quotes.map((q, i) => (
                  <div 
                    key={i}
                    className={`absolute w-full px-4 transition-all duration-700 ease-in-out transform ${
                      i === quoteIndex ? "translate-x-0 opacity-100" : i < quoteIndex ? "-translate-x-full opacity-0" : "translate-x-full opacity-0"
                    }`}
                  >
                    <p className="text-white text-lg font-display italic font-semibold leading-relaxed drop-shadow-md">
                      " {t(q.textKey)} "
                      <span className="block text-sm not-italic mt-2 opacity-80 font-bold tracking-widest uppercase">— {q.author}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          <div className="flex flex-col items-center gap-2 text-center px-4">
             <div className="p-4 bg-brand-soft rounded-full shadow-sm text-brand-tan">
                <Music size={32} />
             </div>
             <h2 className="text-3xl font-display font-bold italic text-brand-text-dark">{t('playlist')}</h2>
             <p className="text-brand-text/70 font-medium font-body uppercase tracking-[0.2em] text-[10px]">
               {t(content.playlist.descKey)} {selectedMood ? ' - ' + t(selectedMood.label) : ''}
             </p>
          </div>

          <div className={`${content.playlist.color} rounded-[2.5rem] p-8 space-y-6 shadow-sm border border-brand-tan/5 transition-colors duration-1000`}>
            <div className="flex gap-6 items-center">
               <div className="w-20 h-20 bg-white/40 rounded-3xl flex items-center justify-center text-brand-text-dark shadow-inner italic font-bold">
                  <Music size={32} strokeWidth={1.5} />
               </div>
               <div className="space-y-1">
                  <h3 className="text-2xl font-display font-extrabold text-brand-text-dark leading-tight">{content.playlist.titleKey}</h3>
                  <p className="text-brand-text/60 font-bold uppercase tracking-widest text-xs">by {content.playlist.artist}</p>
               </div>
            </div>
            <a 
              href={content.playlist.youtube}
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full h-14 bg-red-600 rounded-2xl flex items-center justify-center gap-2 text-white font-bold shadow-lg hover:bg-red-700 transition-all uppercase tracking-widest text-xs"
            >
               <Play size={18} fill="white" />
               {t('search_youtube')}
            </a>
          </div>
        </div>

        <div className="space-y-5 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
           <h2 className="text-2xl font-display font-bold italic text-brand-text-dark text-center">
             {t('daily_reflection')}
           </h2>
           <div className={`p-8 rounded-[2.5rem] border shadow-sm space-y-6 ${isCompleted ? 'bg-green-50' : content.reflection.color}`}>
              <div className="flex items-center gap-3">
                 <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white shadow-sm text-brand-tan">
                    <content.reflection.icon size={24} />
                 </div>
                 <div>
                    <h3 className="font-bold text-brand-text-dark">{t(content.reflection.titleKey)}</h3>
                    <p className="text-[10px] text-brand-text/30 font-black uppercase tracking-widest">{isCompleted ? 'DONE' : 'ACTIVE'}</p>
                 </div>
              </div>
              <p className="text-brand-text-dark/80 font-medium leading-relaxed italic text-lg opacity-80">
                " {t(content.reflection.textKey)} "
              </p>
              <button 
                onClick={() => setIsCompleted(!isCompleted)}
                className="w-full h-14 rounded-2xl bg-brand-tan text-white font-black uppercase tracking-widest text-[10px] shadow-lg"
              >
                {t('mark_complete')}
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default HomeTab;
