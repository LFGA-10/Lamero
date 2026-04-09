import { User, Bell, Shield, Lock, Moon, LogOut, ChevronRight, Heart, Globe, Settings as SettingsIcon } from "lucide-react";
import DynamicBackground from "@/components/DynamicBackground";
import { useLanguage } from "@/context/LanguageContext";
import { Link, useNavigate } from "react-router-dom";

const SettingsTab = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10 relative min-h-screen">
      <DynamicBackground />
      <div className="relative z-10 space-y-8">
        <div className="flex flex-col items-center gap-2">
           <div className="p-4 bg-brand-soft rounded-[2.5rem] shadow-sm text-brand-tan">
              <SettingsIcon size={48} strokeWidth={1.5} />
           </div>
           <h2 className="text-4xl font-display font-bold italic text-brand-text-dark text-center">{t('settings')}</h2>
           <p className="text-brand-text/40 font-black uppercase tracking-[0.2em] text-[10px]">{t('settings_desc')}</p>
        </div>

        <div className="space-y-6">
          <Section title={t('account')}>
            <SettingItem icon={User} label={t('profile')} />
            <SettingItem icon={Bell} label={t('notifications')} />
          </Section>

          <Section title={t('lang_theme')}>
            <Link to="/language">
              <SettingItem 
                icon={Globe} 
                label={t('app_lang')} 
                subLabel={language} 
              />
            </Link>
            <SettingItem icon={Moon} label={t('dark_mode')} isToggle />
          </Section>

          <Section title={t('safety_privacy')}>
            <SettingItem icon={Shield} label={t('trusted_guardian')} subLabel={t('active_protection')} />
            <SettingItem icon={Lock} label={t('privacy_controls')} />
          </Section>

          <Section title={t('circles')}>
            <SettingItem icon={Heart} label={t('support_lumora')} />
          </Section>

          <div className="pt-4 px-2">
             <button 
               onClick={() => navigate("/")}
               className="w-full p-6 rounded-[2rem] bg-red-50 text-red-500 font-bold flex items-center justify-center gap-3 shadow-sm hover:bg-red-100 transition-all active:scale-95 uppercase tracking-widest text-xs"
             >
                <LogOut size={20} />
                {t('log_out')}
             </button>
          </div>
        </div>

        <div className="text-center pt-4">
           <p className="text-[10px] font-bold text-brand-text/20 uppercase tracking-[0.2em]">Lumora v4.1.0 • {t('sanctuary')}</p>
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="space-y-3">
    <h3 className="text-[10px] font-black text-brand-text/30 uppercase tracking-widest ml-5">{title}</h3>
    <div className="bg-white/80 backdrop-blur-sm rounded-[2.5rem] p-2 space-y-1 shadow-sm overflow-hidden border border-brand-tan/5">
      {children}
    </div>
  </div>
);

const SettingItem = ({ icon: Icon, label, subLabel, isToggle }: { icon: any, label: string, subLabel?: string, isToggle?: boolean }) => (
  <div className="w-full p-5 rounded-3xl flex items-center justify-between hover:bg-brand-tan/5 transition-all group cursor-pointer active:scale-[0.98]">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-brand-soft rounded-2xl text-brand-tan group-hover:bg-brand-tan group-hover:text-white transition-all shadow-sm shrink-0">
        <Icon size={20} strokeWidth={2} />
      </div>
      <div className="text-left">
        <p className="text-sm font-bold text-brand-text-dark">{label}</p>
        {subLabel && <p className="text-[10px] font-bold text-brand-tan uppercase tracking-widest mt-0.5">{subLabel}</p>}
      </div>
    </div>
    {isToggle ? (
       <div className="w-12 h-6 bg-brand-tan/20 rounded-full relative p-1 group-hover:bg-brand-tan/30 transition-colors">
          <div className="w-4 h-4 bg-brand-tan rounded-full shadow-sm" />
       </div>
    ) : (
       <ChevronRight size={16} className="text-brand-text/20 group-hover:translate-x-1 transition-transform" />
    )}
  </div>
);

export default SettingsTab;
