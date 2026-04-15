import { useState } from "react";
import { TrendingUp, Award, Zap, Heart, Star, ShieldCheck, ChevronRight, Settings, Bell, Shield, Lock, Moon, Globe, LogOut, Sparkles, User, BarChart3 } from "lucide-react";
import DynamicBackground from "@/components/DynamicBackground";
import { useLanguage } from "@/context/LanguageContext";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import TwoFactorSetup from "@/components/TwoFactorSetup";
import { toast } from "sonner";

interface ProfileTabProps {
  onTabChange?: (tab: any) => void;
}

const ProfileTab = ({ onTabChange }: ProfileTabProps) => {
  const { t, userName, language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const [activeSubTab, setActiveSubTab] = useState<"journey" | "settings">("journey");

  const handleLogout = () => {
    toast.success("Safely logged out from your sanctuary");
    navigate("/");
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 relative min-h-screen">
      <DynamicBackground />
      <div className="relative z-10 space-y-8 py-4 px-2">
        {/* Profile Header Section */}
        <div className="bg-white/80 backdrop-blur-md rounded-[3rem] p-8 shadow-sm border border-brand-tan/10 mx-2 animate-in fade-in zoom-in-95 duration-700 relative group">
          <div className="flex flex-col items-center gap-6">
            <div className="relative group">
              <div className="w-24 h-24 rounded-[2rem] bg-brand-tan/10 flex items-center justify-center text-brand-tan overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200" 
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                  alt="Avatar"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-brand-tan rounded-2xl border-[3px] border-white flex items-center justify-center text-white shadow-lg">
                <Award size={14} fill="white" />
              </div>
            </div>
            
            <div className="text-center space-y-1">
              <h2 className="text-3xl font-display font-bold italic text-brand-text-dark tracking-tight">
                {userName}
              </h2>
              <p className="text-brand-text/40 font-black uppercase tracking-[0.4em] text-[8px]">
                {t('sanctuary')} {t('member')}
              </p>
            </div>
          </div>
        </div>

        {/* Sub-tab Switcher */}
        <div className="mx-2 bg-white/50 backdrop-blur-sm p-1.5 rounded-[2rem] flex border border-brand-tan/10 shadow-sm relative overflow-hidden">
           <button 
             onClick={() => setActiveSubTab("journey")}
             className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all duration-500 relative z-10 ${
               activeSubTab === "journey" ? "text-white" : "text-brand-text/40"
             }`}
           >
             <BarChart3 size={14} />
             {t('journey')}
           </button>
           <button 
             onClick={() => setActiveSubTab("settings")}
             className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all duration-500 relative z-10 ${
               activeSubTab === "settings" ? "text-white" : "text-brand-text/40"
             }`}
           >
             <Settings size={14} />
             {t('settings')}
           </button>
           <div 
             className={`absolute inset-y-1.5 transition-all duration-500 ease-in-out bg-brand-tan rounded-[1.5rem] shadow-lg ${
               activeSubTab === "journey" ? "left-1.5 w-[calc(50%-6px)]" : "left-[calc(50%+3px)] w-[calc(50%-6px)]"
             }`} 
           />
        </div>

        {activeSubTab === "journey" ? (
          /* Journey/Stats View */
          <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
            <div className="mx-2 bg-white/90 backdrop-blur-md rounded-[3.5rem] p-10 space-y-10 shadow-xl border border-brand-tan/10 relative overflow-hidden group">
               <div className="flex justify-between items-center mb-2 px-2">
                  <h3 className="text-xl font-display font-bold italic text-brand-text-dark">{t('emotional_resonance')}</h3>
               </div>
               
               <div className="h-56 px-2 relative group-hover:scale-[1.02] transition-transform duration-700">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 300 120" preserveAspectRatio="none">
                     <defs>
                        <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="0%" stopColor="#ae8159" stopOpacity="0.4" />
                           <stop offset="100%" stopColor="#ae8159" stopOpacity="0" />
                        </linearGradient>
                     </defs>
                     
                     {/* Horizontal grid lines */}
                     {[0, 30, 60, 90, 120].map((y) => (
                        <line 
                          key={y} 
                          x1="0" y1={y} x2="300" y2={y} 
                          stroke="#ae8159" strokeOpacity="0.05" strokeWidth="1" 
                        />
                     ))}

                     {/* Area under the line */}
                     <path 
                        d="M 0 120 L 0 80 C 25 70, 25 50, 50 60 C 75 70, 75 90, 100 85 C 125 80, 125 50, 150 55 C 175 60, 175 30, 200 40 C 225 50, 225 40, 250 35 C 275 30, 275 20, 300 15 L 300 120 Z" 
                        fill="url(#lineGradient)"
                        className="animate-in fade-in duration-1000"
                     />
                     
                     {/* The line itself */}
                     <path 
                        d="M 0 80 C 25 70, 25 50, 50 60 C 75 70, 75 90, 100 85 C 125 80, 125 50, 150 55 C 175 60, 175 30, 200 40 C 225 50, 225 40, 250 35 C 275 30, 275 20, 300 15" 
                        fill="none" stroke="#ae8159" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" 
                        className="animate-draw duration-[2000ms] ease-in-out"
                        style={{ strokeDasharray: 500, strokeDashoffset: 500, animation: 'draw 2s forwards' }}
                     />
                     
                     {/* Data points */}
                     {[
                       { x: 0, y: 80 }, { x: 50, y: 60 }, { x: 100, y: 85 }, 
                       { x: 150, y: 55 }, { x: 200, y: 40 }, { x: 250, y: 35 }, { x: 300, y: 15 }
                     ].map((p, i) => (
                        <g key={i} className="group/dot">
                           <circle 
                             cx={p.x} cy={p.y} r="6" 
                             fill="white" stroke="#ae8159" strokeWidth="2.5" 
                             className="transition-all duration-300 group-hover/dot:r-8 shadow-sm" 
                           />
                           {i === 6 && (
                             <circle cx={p.x} cy={p.y} r="12" fill="#ae8159" className="animate-ping opacity-20" />
                           )}
                        </g>
                     ))}
                  </svg>
                  
                  {/* Days labels */}
                  <div className="flex justify-between mt-8">
                     {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day) => (
                        <span key={day} className="text-[9px] font-black text-brand-text/30 uppercase tracking-tighter">{t(day)}</span>
                     ))}
                  </div>
               </div>
               
               <div className="pt-8 border-t border-brand-tan/5 grid grid-cols-2 gap-8 px-2">
                  <div className="space-y-1">
                     <p className="text-[10px] font-black text-brand-text/30 uppercase tracking-[0.2em]">{t('current_peak')}</p>
                     <p className="text-xl font-display font-bold text-brand-text-dark italic">80% {t('balance')}</p>
                  </div>
                  <div className="space-y-1 text-right">
                     <p className="text-[10px] font-black text-brand-text/30 uppercase tracking-[0.2em]">{t('status')}</p>
                     <p className="text-xl font-display font-bold text-brand-tan italic">{t('rising')}</p>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4 px-2">
               <div className="bg-[#fff9db]/50 backdrop-blur-sm p-8 rounded-[3rem] border border-brand-tan/10 space-y-4 shadow-sm">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-amber-500 shadow-inner">
                     <Star size={24} fill="currentColor" />
                  </div>
                  <div>
                     <p className="text-2xl font-display font-bold italic text-brand-text-dark">12 {t('days')}</p>
                     <p className="text-[10px] font-black text-brand-text/40 uppercase tracking-widest">{t('mindful_streak')}</p>
                  </div>
               </div>
               <div className="bg-[#f8f0fc]/50 backdrop-blur-sm p-8 rounded-[3rem] border border-brand-tan/10 space-y-4 shadow-sm">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-purple-500 shadow-inner">
                     <Award size={24} />
                  </div>
                  <div>
                     <p className="text-2xl font-display font-bold italic text-brand-text-dark">{t('rank')} 4</p>
                     <p className="text-[10px] font-black text-brand-text/40 uppercase tracking-widest">{t('calm_walker')}</p>
                  </div>
               </div>
            </div>
          </div>
        ) : (
          /* Settings View */
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-10 px-2">
              <Section title={t('lang_theme')}>
                <Link to="/">
                  <SettingItem 
                    icon={Globe} 
                    label={t('app_lang')} 
                    subLabel={language} 
                  />
                </Link>
                <SettingItem icon={Moon} label={t('dark_mode')} isToggle />
              </Section>

              <Section title={t('safety_privacy')}>
                <button onClick={() => navigate("/guardian-info")} className="w-full">
                  <SettingItem icon={Shield} label={t('trusted_guardian')} subLabel={t('active_protection')} />
                </button>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="w-full">
                      <SettingItem icon={Lock} label={t('setting_2fa')} subLabel={t('setting_2fa_desc')} />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md rounded-[3rem] border-none glass-strong shadow-2xl p-8">
                    <DialogHeader>
                      <DialogTitle className="hidden">2FA Setup</DialogTitle>
                    </DialogHeader>
                    <TwoFactorSetup />
                  </DialogContent>
                </Dialog>

                <SettingItem icon={Lock} label={t('privacy_controls')} />
              </Section>

              <Section title={t('community_other')}>
                <SettingItem icon={Bell} label={t('notifications')} />
                <SettingItem icon={Heart} label={t('support_lumora')} />
              </Section>

              <div className="pt-4 px-2">
                 <button 
                   onClick={handleLogout}
                   className="w-full p-6 rounded-[2rem] bg-red-50 text-red-500 font-bold flex items-center justify-center gap-3 shadow-md hover:bg-red-100 transition-all active:scale-95 uppercase tracking-widest text-[10px]"
                 >
                    <LogOut size={20} />
                    {t('log_out')}
                 </button>
              </div>
            </div>
          </div>
        )}

        {/* Daily Insight Bar */}
        <div className="bg-brand-tan text-white p-6 rounded-[2.5rem] flex items-center justify-center gap-4 shadow-lg shadow-brand-tan/20 mx-2 mt-4">
           <div className="animate-pulse-soft">
              <Sparkles size={20} />
           </div>
           <p className="text-[10px] font-black uppercase tracking-[0.2em] italic text-center">
             " {t('daily_insight')} "
           </p>
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="space-y-4">
    <h3 className="text-[10px] font-black text-brand-text/30 uppercase tracking-[0.3em] ml-6">{title}</h3>
    <div className="bg-white/80 backdrop-blur-sm rounded-[3rem] p-3 space-y-1 shadow-sm overflow-hidden border border-brand-tan/5">
      {children}
    </div>
  </div>
);

const SettingItem = ({ icon: Icon, label, subLabel, isToggle }: { icon: any, label: string, subLabel?: string, isToggle?: boolean }) => (
  <div className="w-full p-5 rounded-[2rem] flex items-center justify-between hover:bg-brand-tan/5 transition-all group cursor-pointer active:scale-[0.98]">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-brand-soft rounded-2xl text-brand-tan group-hover:bg-brand-tan group-hover:text-white transition-all shadow-sm shrink-0">
        <Icon size={20} strokeWidth={2} />
      </div>
      <div className="text-left">
        <p className="text-xs font-bold text-brand-text-dark">{label}</p>
        {subLabel && <p className="text-[8px] font-bold text-brand-tan uppercase tracking-widest mt-0.5">{subLabel}</p>}
      </div>
    </div>
    {isToggle ? (
       <div className="w-10 h-6 bg-brand-tan/10 rounded-full relative p-1 transition-colors group-hover:bg-brand-tan/20">
          <div className="w-4 h-4 bg-brand-tan rounded-full shadow-sm" />
       </div>
    ) : (
       <ChevronRight size={16} className="text-brand-text/20 group-hover:translate-x-1 transition-all" />
    )}
  </div>
);

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
