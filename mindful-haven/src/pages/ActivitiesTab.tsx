import { useState } from "react";
import { Play, Clock, Sparkles, Wind, Brain, Heart, TreePine, ChevronRight, Apple } from "lucide-react";
import DynamicBackground from "@/components/DynamicBackground";
import { useLanguage } from "@/context/LanguageContext";

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
    textColor: "text-blue-600"
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
    isTopPick: true
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
    textColor: "text-purple-600"
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
    textColor: "text-pink-600"
  }
];

const ActivitiesTab = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10 relative min-h-screen">
      <DynamicBackground />
      <div className="relative z-10 space-y-8">
        <div className="flex flex-col items-center gap-2">
           <div className="p-4 bg-brand-soft rounded-[2.5rem] shadow-sm text-brand-tan">
              <Sparkles size={48} strokeWidth={1.5} />
           </div>
           <h2 className="text-4xl font-display font-bold italic text-brand-text-dark text-center">{t('activities')}</h2>
           <p className="text-brand-text/40 font-black uppercase tracking-[0.2em] text-[10px]">{t('playlist_desc')}</p>
        </div>

        <div className="grid gap-6">
          {activities.map((activity) => (
            <div 
              key={activity.id} 
              className="bg-white/80 backdrop-blur-md rounded-[2.5rem] p-8 shadow-sm hover:shadow-lg transition-all border border-brand-tan/5 group relative overflow-hidden"
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
                <button className="w-14 h-14 bg-brand-tan text-white rounded-2xl flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all">
                  <Play size={24} fill="white" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Star = ({ size, fill }: { size: number, fill: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default ActivitiesTab;
