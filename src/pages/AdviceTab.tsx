import { useState, useRef, useEffect } from "react";
import { BookOpen, Headphones, Shield, Heart, Compass, Star, ChevronRight, Play, Pause, X, Music } from "lucide-react";
import DynamicBackground from "@/components/DynamicBackground";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "sonner";

const mentalHealthResources = [
  {
    id: 1,
    titleKey: "book_1_title",
    authorKey: "book_1_auth",
    descKey: "book_1_desc",
    category: "Philosophy & Resilience",
    icon: Compass,
    color: "bg-brand-tan/10",
    textColor: "text-brand-tan",
    tags: ["HOPE", "RESILIENCE", "MEANING"],
    link: "https://archive.org/details/viktor-emil-frankl-mans-search-for-meaning"
  },
  {
    id: 2,
    titleKey: "book_2_title",
    authorKey: "book_2_auth",
    descKey: "book_2_desc",
    category: "Trauma & Neuroscience",
    icon: Shield,
    color: "bg-indigo-50",
    textColor: "text-indigo-600",
    tags: ["HEALING", "SCIENCE", "RECOVERY"],
    link: "https://ia601604.us.archive.org/35/items/the-body-keeps-the-score-pdf/The-Body-Keeps-the-Score-PDF.pdf"
  }
];

// Mood-based playlist data
const moodPlaylists: Record<string, { title: string, url: string }> = {
  "Radiant": { title: "Morning Sunrays", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  "Peaceful": { title: "Still Waters", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  "Tired": { title: "Deep Rest Brown Noise", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
  "Anxious": { title: "Weightless Calming", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
  "Sad": { title: "Reflective Piano Solos", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" },
  "Reflective": { title: "Thoughtful Echoes", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3" },
  "Default": { title: "Mindful Ambient", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" }
};

const AdviceTab = () => {
  const { t, mood } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentPlaylist = mood ? (moodPlaylists[mood.label] || moodPlaylists["Default"]) : moodPlaylists["Default"];

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      if (audioRef.current) {
        audioRef.current.src = currentPlaylist.url;
        audioRef.current.load();
        audioRef.current.play().catch(() => {
          toast.error("Playback limited. Tap again to enjoy.");
        });
        setIsPlaying(true);
      }
    }
  };

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-32 relative min-h-screen">
      <DynamicBackground />
      <audio ref={audioRef} loop />
      
      <div className="relative z-10 space-y-8 px-4 py-4">
        <div className="flex flex-col items-center gap-2">
           <div className="p-4 bg-brand-soft rounded-[2.5rem] shadow-sm text-brand-tan border border-brand-tan/10">
              <BookOpen size={48} strokeWidth={1.5} />
           </div>
           <h2 className="text-4xl font-display font-bold italic text-brand-text-dark text-center">{t('library')}</h2>
           <p className="text-brand-text/40 font-black uppercase tracking-[0.2em] text-[10px]">{t('sanctuary')}</p>
        </div>

        <div className="space-y-6">
          {mentalHealthResources.map((resource) => (
            <div 
              key={resource.id} 
              className="group bg-white/80 backdrop-blur-md rounded-[3rem] p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-brand-tan/5 relative overflow-hidden"
            >
              <div className="flex items-start justify-between mb-8">
                <div className="space-y-1">
                  <div className="flex gap-2 mb-3">
                    {resource.tags.map(tag => (
                      <span key={tag} className="text-[8px] font-black tracking-widest bg-brand-soft text-brand-tan px-3 py-1 rounded-full">{tag}</span>
                    ))}
                  </div>
                  <h3 className="text-3xl font-display font-extrabold text-brand-text-dark leading-tight italic">
                    {t(resource.titleKey)}
                  </h3>
                  <p className="text-sm font-bold text-brand-text/30 uppercase tracking-[0.2em]">
                    BY {t(resource.authorKey)}
                  </p>
                </div>
                <div className={`p-5 ${resource.color} ${resource.textColor} rounded-[2rem] shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                  <resource.icon size={28} strokeWidth={1.5} />
                </div>
              </div>
              
              <p className="text-brand-text/60 font-medium leading-relaxed mb-10 italic text-lg line-clamp-3">
                " {t(resource.descKey)} "
              </p>

              <button 
                onClick={() => window.open(resource.link, '_blank')}
                className="w-full h-20 bg-brand-soft hover:bg-white text-brand-text-dark rounded-[2.5rem] flex items-center justify-center gap-3 transition-all group-hover:bg-brand-tan group-hover:text-white shadow-sm border border-brand-tan/5"
              >
                <BookOpen size={20} className="group-hover:animate-bounce" />
                <span className="text-xs font-black uppercase tracking-[0.2em]">{t('read_now')}</span>
              </button>
            </div>
          ))}
        </div>

        {/* Featured Audio Section - Dynamic Playlist */}
        <div className="bg-brand-text-dark rounded-[3rem] p-10 space-y-6 border border-white/5 relative overflow-hidden group shadow-2xl">
           <div className="absolute top-0 right-0 w-64 h-64 bg-brand-tan/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-tan/30 transition-all duration-1000" />
           
           <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="p-4 bg-white/10 rounded-2xl text-brand-tan shadow-sm backdrop-blur-md">
                    <Headphones size={28} />
                 </div>
                 <div>
                    <h3 className="text-2xl font-display font-bold italic text-white">{t('playlist')}</h3>
                    <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em]">Personalized Resonance</p>
                 </div>
              </div>
              {mood && (
                <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full flex items-center gap-2">
                   <span className="text-lg">{mood.emoji}</span>
                   <span className="text-[8px] font-black text-white/60 uppercase tracking-widest">{mood.label}</span>
                </div>
              )}
           </div>

           <div className="relative z-10 p-8 bg-white/5 rounded-[2.5rem] border border-white/10 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                 <div className="space-y-1">
                    <p className="text-[10px] font-black text-brand-tan uppercase tracking-widest">Now Selected</p>
                    <h4 className="text-xl font-display font-bold italic text-white leading-none">{currentPlaylist.title}</h4>
                 </div>
                 <button 
                   onClick={togglePlay}
                   className="w-16 h-16 bg-brand-tan text-white rounded-2xl flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all"
                 >
                    {isPlaying ? <Pause size={28} fill="white" /> : <Play size={28} fill="white" className="ml-1" />}
                 </button>
              </div>
           </div>

           <p className="relative z-10 text-white/40 font-medium leading-relaxed italic text-sm text-center px-4">
             "Music is the mediator between the spiritual and the sensual life." — Beethoven
           </p>
        </div>

        {/* Global Player Overlay if playing */}
        {isPlaying && (
          <div className="fixed bottom-28 left-4 right-4 bg-white/95 backdrop-blur-xl rounded-[2rem] p-4 flex items-center justify-between shadow-2xl animate-in slide-in-from-bottom-10 z-50 border border-brand-tan/10">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-brand-tan/10 rounded-2xl flex items-center justify-center text-brand-tan animate-spin-slow">
                  <Music size={20} />
               </div>
               <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-brand-text/30 mb-0.5">Atmosphere Active</p>
                  <p className="text-sm font-display font-bold italic text-brand-text-dark">{currentPlaylist.title}</p>
               </div>
            </div>
            <button 
              onClick={() => { audioRef.current?.pause(); setIsPlaying(false); }}
              className="p-3 bg-brand-soft text-brand-text-dark rounded-xl hover:bg-brand-tan hover:text-white transition-all"
            >
               <X size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdviceTab;
