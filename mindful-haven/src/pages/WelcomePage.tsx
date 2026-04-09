import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DynamicBackground from "@/components/DynamicBackground";
import { useLanguage } from "@/context/LanguageContext";

const WelcomePage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/mood-selection");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
      <DynamicBackground />
      <div className="z-10 text-center space-y-2 animate-in fade-in zoom-in duration-1000">
         <p className="text-brand-text/40 font-black uppercase tracking-[0.4em] text-xs">
           {t('welcome_to')}
         </p>
         <h1 className="text-[100px] font-display font-light italic text-[#ae8159] tracking-tighter leading-none animate-pulse-soft">
           {t('welcome_plain')}
         </h1>
         <div className="pt-8">
            <h2 className="text-5xl font-display font-black text-brand-text-dark italic tracking-tight uppercase">
               Lumora
            </h2>
         </div>
      </div>
      
      <div className="absolute bottom-12 flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
         <div className="w-1 h-12 bg-gradient-to-b from-brand-tan/40 to-transparent rounded-full" />
         <p className="text-[10px] font-bold text-brand-text/20 uppercase tracking-[0.3em]">{t('preparing')}</p>
      </div>
    </div>
  );
};

export default WelcomePage;
