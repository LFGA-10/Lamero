import { useState, useRef, useEffect } from "react";
import { Play, Clock, Sparkles, Wind, Brain, Heart, TreePine, ChevronRight, Pause, Volume2, X, Music } from "lucide-react";
import DynamicBackground from "@/components/DynamicBackground";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "sonner";

const activities = [
  {
    id: 1,
    titleKey: "act_1_title",
    descKey: "act_1_desc",
    icon: Wind,
    duration: "10",
    intensity: "Low",
    category: "BREATHWORK",
    color: "bg-blue-50",
    textColor: "text-blue-600",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // Replacing with a reliable test link first, then a more rhythmic one if needed.
  },
  {
    id: 2,
    titleKey: "act_2_title",
    descKey: "act_2_desc",
    icon: TreePine,
    duration: "20",
    intensity: "Medium",
    category: "NATURE",
    color: "bg-green-50",
    textColor: "text-green-600",
    isTopPick: true,
    audioUrl: "https://cdn.pixabay.com/audio/2022/01/18/audio_d0a13f69d2.mp3" // Forest
  },
  {
    id: 3,
    titleKey: "act_3_title",
    descKey: "act_3_desc",
    icon: Brain,
    duration: "15",
    intensity: "Medium",
    category: "MINDFULNESS",
    color: "bg-purple-50",
    textColor: "text-purple-600",
    audioUrl: "https://cdn.pixabay.com/audio/2021/11/25/audio_91b32e02f9.mp3" // Tibetan bowls
  },
  {
    id: 4,
    titleKey: "act_4_title",
    descKey: "act_4_desc",
    icon: Heart,
    duration: "12",
    intensity: "Low",
    category: "JOURNALING",
    color: "bg-pink-50",
    textColor: "text-pink-600",
    audioUrl: "https://cdn.pixabay.com/audio/2022/03/10/audio_c8c8a16706.mp3" // Lo-fi
  }
];

const ActivitiesTab = () => {
  const { t } = useLanguage();
  const [playingId, setPlayingId] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = (activity: any) => {
    if (playingId === activity.id) {
      audioRef.current?.pause();
      setPlayingId(null);
    } else {
      setPlayingId(activity.id);
      if (audioRef.current) {
        audioRef.current.src = activity.audioUrl;
        audioRef.current.load();
        audioRef.current.play().catch(err => {
          console.error("Playback failed:", err);
          toast.error("Audio playback restricted by browser. Tap again to play.");
        });
      }
      toast.info(`Now playing: ${t(activity.titleKey)}`);
    }
  };

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const activeActivity = activities.find(a => a.id === playingId);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-32 relative min-h-screen">
      <DynamicBackground />
      <audio ref={audioRef} loop />

      <div className="relative z-10 space-y-8">
        <div className="flex flex-col items-center gap-2">
           <div className="p-4 bg-brand-soft rounded-[2.5rem] shadow-sm text-brand-tan border border-brand-tan/10">
              <Sparkles size={48} strokeWidth={1.5} />
           </div>
           <h2 className="text-4xl font-display font-bold italic text-brand-text-dark text-center">{t('activities')}</h2>
           <p className="text-brand-text/40 font-black uppercase tracking-[0.2em] text-[10px]">{t('playlist_desc')}</p>
        </div>

        <div className="grid gap-6 px-4">
          {activities.map((activity) => (
            <div 
              key={activity.id} 
              className={`bg-card/80 backdrop-blur-md rounded-[2.5rem] p-8 shadow-sm transition-all border border-brand-tan/5 group relative overflow-hidden ${playingId === activity.id ? 'ring-2 ring-brand-tan border-transparent shadow-xl' : 'hover:shadow-lg'}`}
            >
              {activity.isTopPick && (
                <div className="absolute top-6 right-8 flex items-center gap-2 bg-brand-tan text-white text-[8px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-lg z-20">
                  <Star size={10} fill="white" />
                  {t('top_pick')}
                </div>
              )}

              <div className="flex items-center gap-6 mb-8">
                <div className={`w-20 h-20 ${activity.color} ${activity.textColor} rounded-3xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                  <activity.icon size={36} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-black text-brand-text-dark italic leading-tight">{t(activity.titleKey)}</h3>
                  <p className="text-[10px] font-black text-brand-text/30 uppercase tracking-[0.2em] mt-1">{activity.category}</p>
                </div>
              </div>

              <p className="text-brand-text/60 font-medium leading-relaxed italic mb-8 pr-4">
                {t(activity.descKey)}
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-brand-tan/5">
                <div className="flex items-center gap-8">
                  <div className="space-y-1">
                    <p className="text-[8px] font-black text-brand-text/20 uppercase tracking-widest">{t('duration')}</p>
                    <p className="text-sm font-bold text-brand-text-dark flex items-center gap-1.5">
                      <Clock size={12} className="text-brand-tan" />
                      {activity.duration} {t('min_suffix')}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[8px] font-black text-brand-text/20 uppercase tracking-widest">{t('intensity')}</p>
                    <p className="text-sm font-bold text-brand-text-dark">{t(activity.intensity)}</p>
                  </div>
                </div>
                <button 
                  onClick={() => togglePlay(activity)}
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                    playingId === activity.id 
                    ? "bg-brand-tan text-white scale-110 shadow-lg" 
                    : "bg-brand-tan/10 text-brand-tan shadow-sm hover:scale-105 active:scale-95"
                  }`}
                >
                  {playingId === activity.id ? <Pause size={24} fill="white" /> : <Play size={24} fill="currentColor" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Persistent Audio Player Bar */}
      {activeActivity && (
        <div className="fixed bottom-28 left-4 right-4 bg-brand-text-dark text-white rounded-[2rem] p-4 flex items-center justify-between shadow-2xl animate-in slide-in-from-bottom-10 duration-700 z-50">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-card/5 rounded-2xl flex items-center justify-center animate-spin-slow">
                <Music size={20} />
             </div>
             <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Now Meditating</p>
                <p className="text-sm font-display font-bold italic">{t(activeActivity.titleKey)}</p>
             </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="flex gap-1">
                {[...Array(4)].map((_, i) => (
                   <div key={i} className="w-1 bg-brand-tan rounded-full animate-pulse" style={{ height: `${Math.random() * 12 + 4}px`, animationDelay: `${i * 0.2}s` }} />
                ))}
             </div>
             <button 
               onClick={() => { audioRef.current?.pause(); setPlayingId(null); }}
               className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all"
             >
                <X size={18} />
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Star = ({ size, fill }: { size: number, fill: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default ActivitiesTab;
