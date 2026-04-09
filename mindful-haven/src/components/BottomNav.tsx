import { Home, Leaf, MessageCircle, BookOpen, Settings, Map } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type TabId = "home" | "activities" | "advice" | "explore" | "communities" | "profile" | "settings";

interface BottomNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  const { t } = useLanguage();

  const navItems: { id: TabId; label: string; icon: any }[] = [
    { id: "home", label: t('home'), icon: Home },
    { id: "activities", label: t('play'), icon: Leaf },
    { id: "communities", label: t('circles'), icon: MessageCircle },
    { id: "advice", label: t('library'), icon: BookOpen },
    { id: "profile", label: t('journey'), icon: Map },
    { id: "settings", label: t('settings'), icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-24 glass-strong border-t border-brand-tan/10 z-50 px-2 flex items-center justify-around pb-4 shadow-[0_-8px_30px_rgb(0,0,0,0.04)]">
      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        const Icon = item.icon;
        
        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex flex-col items-center gap-1.5 transition-all duration-300 relative ${
              isActive ? "scale-105" : "opacity-40 grayscale hover:opacity-100"
            }`}
          >
            <div className={`p-2 rounded-2xl transition-all duration-500 ${
              isActive ? "bg-brand-tan text-white shadow-lg overflow-hidden" : "text-brand-text"
            }`}>
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              {isActive && (
                 <div className="absolute inset-0 bg-white/20 animate-pulse-soft pointer-events-none" />
              )}
            </div>
            <span className={`text-[8px] font-black tracking-widest uppercase transition-colors duration-300 ${
              isActive ? "text-brand-text-dark" : "text-brand-text/30"
            }`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
