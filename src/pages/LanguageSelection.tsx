import { useNavigate } from "react-router-dom";
import { useLanguage, Language } from "@/context/LanguageContext";
import DynamicBackground from "@/components/DynamicBackground";
import { Globe, ChevronRight } from "lucide-react";

const languages: { name: Language; label: string; sub: string }[] = [
  { name: "English", label: "English", sub: "English" },
  { name: "French", label: "Français", sub: "French" },
  { name: "Kinyarwanda", label: "Ikinyarwanda", sub: "Kinyarwanda" },
  { name: "Swahili", label: "Kiswahili", sub: "Swahili" },
  { name: "Portuguese", label: "Português", sub: "Portuguese" },
  { name: "Spanish", label: "Español", sub: "Spanish" },
  { name: "Russian", label: "Pусский", sub: "Russian" },
];

const LanguageSelection = () => {
  const { setLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const handleSelect = (lang: Language) => {
    setLanguage(lang);
    navigate("/onboarding");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden">
      <DynamicBackground />
      <div className="w-full max-w-lg z-10 space-y-8 animate-in fade-in duration-700">
        <div className="flex flex-col items-center gap-4 text-center">
           <div className="p-5 bg-brand-soft rounded-[2.5rem] shadow-sm text-brand-tan">
              <Globe size={48} />
           </div>
           <div className="space-y-1">
              <h2 className="text-4xl font-display font-bold italic text-brand-text-dark">Select Language</h2>
              <p className="text-[10px] font-black text-brand-text/30 uppercase tracking-[0.2em]">Choose your preferred language</p>
           </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {languages.map((lang, i) => (
            <button
              key={lang.name}
              onClick={() => handleSelect(lang.name)}
              className="w-full p-6 glass rounded-[2rem] flex items-center justify-between group hover:scale-[1.02] transition-all border-none bg-white/40 hover:bg-white/60 animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 bg-brand-soft rounded-xl flex items-center justify-center text-brand-text-dark font-black text-xs">
                    {lang.name.substring(0, 2).toUpperCase()}
                 </div>
                 <div className="text-left">
                    <p className="font-bold text-brand-text-dark">{lang.label}</p>
                    <p className="text-[10px] font-bold text-brand-text/40 uppercase tracking-widest">{lang.sub}</p>
                 </div>
              </div>
              <ChevronRight size={20} className="text-brand-text/20 group-hover:translate-x-1 transition-transform" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelection;
