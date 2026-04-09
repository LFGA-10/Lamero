import { TrendingUp, Award, Zap, Heart, Star, ShieldCheck, ChevronRight } from "lucide-react";
import DynamicBackground from "@/components/DynamicBackground";
import { useLanguage } from "@/context/LanguageContext";

const ProfileTab = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 relative min-h-screen">
      <DynamicBackground />
      <div className="relative z-10 space-y-10 py-8 px-2">
        {/* Header Section */}
        <div className="flex flex-col items-center gap-4 text-center">
           <div className="relative">
              <div className="p-6 bg-brand-soft rounded-[3rem] shadow-sm text-brand-tan">
                 <TrendingUp size={48} strokeWidth={1.5} />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-brand-tan text-white p-2 rounded-xl shadow-lg border-2 border-white">
                 <Zap size={16} fill="white" />
              </div>
           </div>
           <div className="space-y-1">
              <h2 className="text-4xl font-display font-bold italic text-brand-text-dark">{t('journey')}</h2>
              <p className="text-[10px] font-black text-brand-text/30 uppercase tracking-[0.4em]">Personal Growth Analytics</p>
           </div>
        </div>

        {/* Main Graph Card */}
        <div className="bg-white/90 backdrop-blur-md rounded-[3.5rem] p-10 space-y-10 shadow-xl border border-brand-tan/10 relative overflow-hidden group">
           <div className="flex justify-between items-center mb-2 px-2">
              <h3 className="text-xl font-display font-bold italic text-brand-text-dark">Emotional Resonance</h3>
              <p className="text-[10px] font-black text-brand-tan uppercase tracking-widest">{t('last_7_days')}</p>
           </div>
           
           <div className="flex items-end justify-between h-48 px-2 gap-2">
              {[40, 55, 35, 60, 70, 65, 80].map((val, i) => (
                <div key={i} className="flex flex-col items-center gap-4 group/bar cursor-pointer h-full justify-end flex-1">
                   <div className="relative flex flex-col items-center w-full group-hover/bar:-translate-y-2 transition-transform duration-500">
                      <div 
                        className="w-full max-w-[12px] bg-brand-tan/10 rounded-full transition-all duration-700 group-hover/bar:bg-brand-tan group-hover/bar:shadow-lg relative" 
                        style={{ height: `${val * 1.5}px` }} 
                      >
                         {i === 6 && (
                           <div className="absolute inset-0 bg-brand-tan rounded-full animate-pulse-soft" />
                         )}
                      </div>
                   </div>
                   <span className="text-[9px] font-black text-brand-text/20 uppercase tracking-tighter">
                     {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                   </span>
                </div>
              ))}
           </div>
           
           <div className="pt-8 border-t border-brand-tan/5 grid grid-cols-2 gap-8 px-2">
              <div className="space-y-1">
                 <p className="text-[10px] font-black text-brand-text/30 uppercase tracking-[0.2em]">Current Peak</p>
                 <p className="text-xl font-display font-bold text-brand-text-dark italic">80% Balance</p>
              </div>
              <div className="space-y-1 text-right">
                 <p className="text-[10px] font-black text-brand-text/30 uppercase tracking-[0.2em]">Status</p>
                 <p className="text-xl font-display font-bold text-brand-tan italic">Rising</p>
              </div>
           </div>
        </div>

        {/* New Features: Wellness Achievements */}
        <div className="grid grid-cols-2 gap-4">
           <div className="bg-[#fff9db]/50 backdrop-blur-sm p-8 rounded-[3rem] border border-brand-tan/10 space-y-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-amber-500 shadow-sm">
                 <Star size={24} fill="currentColor" />
              </div>
              <div>
                 <p className="text-2xl font-display font-bold italic text-brand-text-dark">12 Days</p>
                 <p className="text-[10px] font-black text-brand-text/40 uppercase tracking-widest">Mindful Streak</p>
              </div>
           </div>
           <div className="bg-[#f8f0fc]/50 backdrop-blur-sm p-8 rounded-[3rem] border border-brand-tan/10 space-y-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-purple-500 shadow-sm">
                 <Award size={24} />
              </div>
              <div>
                 <p className="text-2xl font-display font-bold italic text-brand-text-dark">Rank 4</p>
                 <p className="text-[10px] font-black text-brand-text/40 uppercase tracking-widest">Calm Walker</p>
              </div>
           </div>
        </div>

        {/* Milestone Section */}
        <div className="p-8 glass rounded-[3rem] border border-brand-tan/10 space-y-6 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-5">
              <Heart size={100} fill="currentColor" />
           </div>
           <div className="flex justify-between items-center">
              <h3 className="text-lg font-display font-bold italic text-brand-text-dark">Recent Milestones</h3>
              <ChevronRight size={16} className="text-brand-text/20" />
           </div>
           <div className="space-y-4">
              <MilestoneItem 
                icon={ShieldCheck} 
                title="7 Day Peace Guardian" 
                desc="Maintained a stable mood for a full week." 
                color="text-green-500"
              />
              <MilestoneItem 
                icon={Zap} 
                title="Spark of Clarity" 
                desc="Completed 5 meditations in a single day." 
                color="text-blue-500"
              />
           </div>
        </div>

        {/* Daily Insight Bar */}
        <div className="bg-brand-tan text-white p-6 rounded-[2.5rem] flex items-center justify-center gap-4 shadow-lg shadow-brand-tan/20">
           <SparklesIcon />
           <p className="text-[11px] font-black uppercase tracking-[0.2em] italic">
             " Your energy is flowing beautifully today. "
           </p>
        </div>
      </div>
    </div>
  );
};

const MilestoneItem = ({ icon: Icon, title, desc, color }: { icon: any, title: string, desc: string, color: string }) => (
  <div className="flex items-center gap-4">
     <div className={`p-3 bg-white rounded-xl ${color} shadow-sm`}>
        <Icon size={16} />
     </div>
     <div className="space-y-0.5">
        <p className="text-xs font-bold text-brand-text-dark">{title}</p>
        <p className="text-[10px] text-brand-text/60 font-medium">{desc}</p>
     </div>
  </div>
);

const SparklesIcon = () => (
   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      <path d="m5 3 1 1"/>
      <path d="m5 21 1-1"/>
      <path d="m19 3-1 1"/>
      <path d="m19 21-1-1"/>
   </svg>
);

export default ProfileTab;
