import { BookOpen, Headphones, Shield, Heart, Compass, Star, ChevronRight, Play } from "lucide-react";
import DynamicBackground from "@/components/DynamicBackground";
import { useLanguage } from "@/context/LanguageContext";

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
    tags: ["HOPE", "RESILIENCE", "MEANING"]
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
    tags: ["HEALING", "SCIENCE", "RECOVERY"]
  }
];

const AdviceTab = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10 relative min-h-screen">
      <DynamicBackground />
      <div className="relative z-10 space-y-8">
        <div className="flex flex-col items-center gap-2">
           <div className="p-4 bg-brand-soft rounded-[2.5rem] shadow-sm text-brand-tan">
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

              <button className="w-full h-20 bg-brand-soft hover:bg-white text-brand-text-dark rounded-[2.5rem] flex items-center justify-center gap-3 transition-all group-hover:bg-brand-tan group-hover:text-white shadow-sm border border-brand-tan/5">
                <BookOpen size={20} className="group-hover:animate-bounce" />
                <span className="text-xs font-black uppercase tracking-[0.2em]">{t('read_now')}</span>
              </button>
            </div>
          ))}
        </div>

        {/* Featured Audio Section */}
        <div className="bg-brand-tan/10 rounded-[3rem] p-10 space-y-6 border border-brand-tan/20">
           <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-2xl text-brand-tan shadow-sm">
                 <Headphones size={24} />
              </div>
              <h3 className="text-2xl font-display font-bold italic text-brand-text-dark">{t('playlist')}</h3>
           </div>
           <p className="text-brand-text-dark/60 font-medium leading-relaxed italic pr-4">
             Explore our collection of immersive soundscapes designed to accompany your reading journey.
           </p>
           <button className="flex items-center gap-4 px-8 py-4 bg-white rounded-full text-[10px] font-black text-brand-text-dark uppercase tracking-widest shadow-sm hover:scale-105 transition-all">
              <Play size={12} fill="currentColor" />
              {t('access_resource')}
           </button>
        </div>
      </div>
    </div>
  );
};

export default AdviceTab;
