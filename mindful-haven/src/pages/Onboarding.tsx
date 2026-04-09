import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, Bell, MapPin, Shield, Sparkles } from "lucide-react";
import DynamicBackground from "@/components/DynamicBackground";
import { useLanguage } from "@/context/LanguageContext";

const Onboarding = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden">
      <DynamicBackground />
      <div className="w-full max-w-md z-10 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <h1 className="text-6xl font-display font-black text-brand-text-dark italic text-center tracking-tight mb-8">
           {t('before_begin')}
        </h1>

        <div className="space-y-6">
          <Card className="p-8 rounded-[3rem] glass-strong border-white/20 shadow-2xl relative overflow-hidden group">
            <div className="flex gap-6 items-start">
               <div className="p-4 bg-brand-soft rounded-2xl text-brand-tan shadow-sm group-hover:scale-110 transition-transform">
                  <Sparkles size={24} />
               </div>
               <div className="space-y-2">
                  <h3 className="text-2xl font-display font-bold text-brand-text-dark italic">{t('our_commitment')}</h3>
                  <p className="text-sm text-brand-text/60 leading-relaxed font-body">
                    {t('commitment_text')}
                  </p>
               </div>
            </div>
          </Card>

          <Card className="p-8 rounded-[3rem] glass-strong border-white/20 shadow-2xl space-y-8">
            <div className="flex items-center gap-4 border-b border-brand-tan/10 pb-4">
               <div className="p-2 bg-brand-soft rounded-xl text-brand-tan">
                  <Shield size={20} />
               </div>
               <h3 className="text-xl font-display font-bold text-brand-text-dark italic">{t('sys_perms')}</h3>
            </div>
            
            <div className="space-y-6">
               <PermissionItem 
                 icon={Camera} 
                 title={t('camera')} 
                 desc={t('camera_desc')} 
               />
               <PermissionItem 
                 icon={Bell} 
                 title={t('notifications')} 
                 desc={t('notify_desc')} 
               />
               <PermissionItem 
                 icon={MapPin} 
                 title={t('location')} 
                 desc={t('loc_desc')} 
               />
            </div>
          </Card>
        </div>

        <Button
          onClick={() => navigate("/auth")}
          className="w-full h-18 rounded-[2rem] bg-brand-tan hover:bg-[#ae8159] text-white text-sm font-black uppercase tracking-[0.3em] shadow-xl transition-all duration-500 hover:scale-[1.02] border-none"
        >
          {t('understand_begin')}
        </Button>
      </div>
    </div>
  );
};

const PermissionItem = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="flex items-center gap-6 group cursor-default">
     <div className="w-12 h-12 rounded-2xl bg-white/50 backdrop-blur-sm flex items-center justify-center text-brand-tan shadow-sm group-hover:bg-white transition-all">
        <Icon size={20} strokeWidth={1.5} />
     </div>
     <div className="space-y-0.5">
        <p className="text-base font-bold text-brand-text-dark leading-none">{title}</p>
        <p className="text-[10px] font-black text-brand-text/30 uppercase tracking-widest">{desc}</p>
     </div>
  </div>
);

export default Onboarding;
