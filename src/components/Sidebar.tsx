import { useState } from "react";
import { 
  Home, 
  Activity, 
  Lightbulb, 
  Compass, 
  Users, 
  User, 
  Settings, 
  ChevronRight, 
  ChevronLeft,
  Moon,
  Sun,
  HelpCircle,
  LogOut,
  Brain,
  Globe,
  Check
} from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

type TabId = "home" | "activities" | "advice" | "explore" | "communities" | "profile" | "settings";

interface SidebarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  isExpanded: boolean;
  onToggle: () => void;
}

const tabs: { id: TabId; label: string; icon: any }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "activities", label: "Activities", icon: Activity },
  { id: "advice", label: "Advice", icon: Lightbulb },
  { id: "explore", label: "Explore", icon: Compass },
  { id: "communities", label: "Community", icon: Users },
  { id: "profile", label: "Profile", icon: User },
  { id: "settings", label: "Settings", icon: Settings },
];

const languages = [
  "English", "French", "Spanish", "German", "Chinese", "Japanese", "Korean", "Russian",
  "Arabic", "Hindi", "Portuguese", "Italian", "Turkish", "Dutch", "Greek", "Swedish",
  "Danish", "Finnish", "Norwegian", "Polish", "Hungarian", "Czech", "Thai", "Vietnamese",
  "Indonesian", "Malay", "Filipino", "Swahili", "Amharic", "Yoruba", "Igbo", "Zulu",
  "Xhosa", "Afrikaans", "Bengali", "Punjabi", "Marathi", "Gujarati", "Kannada", "Telugu",
  "Tamil", "Malayalam", "Sinhala", "Burmese", "Khmer", "Lao", "Mongolian", "Hebrew",
  "Persian", "Urdu", "Pashto", "Kurdish", "Armenian", "Georgian"
]; // 54 languages

const Sidebar = ({ activeTab, onTabChange, isExpanded, onToggle }: SidebarProps) => {
  const { theme, setTheme } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [currentLang, setCurrentLang] = useState("English");

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <aside 
      className={`fixed left-0 top-0 h-full z-50 transition-all duration-500 ease-in-out flex flex-col glass-strong rounded-r-[2.5rem] shadow-2xl border-r-brand-tan/10 ${
        isExpanded ? "w-64" : "w-20"
      }`}
    >
      {/* Logo Section */}
      <div className="p-6 flex items-center gap-3">
        <div className="min-w-[40px] h-10 bg-brand-tan/10 rounded-2xl flex items-center justify-center animate-pulse-soft">
          <Brain className="text-brand-tan" size={24} />
        </div>
        {isExpanded && (
          <span className="font-display font-bold text-2xl tracking-tight animate-in fade-in slide-in-from-left-4 duration-500 text-brand-text-dark italic">
            Haven 🌸
          </span>
        )}
      </div>

      {/* Toggle Button */}
      <button 
        onClick={onToggle}
        className="absolute -right-4 top-24 w-8 h-8 bg-brand-tan rounded-full flex items-center justify-center border-4 border-background text-white hover:scale-110 transition-transform z-10 shadow-lg"
      >
        {isExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>

      {/* Tabs Section */}
      <nav className="flex-1 px-3 py-6 flex flex-col gap-2 overflow-y-auto no-scrollbar">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-4 p-3.5 rounded-[1.25rem] transition-all duration-300 relative group overflow-hidden ${
                isActive 
                  ? "bg-brand-tan text-white shadow-md shadow-brand-tan/20" 
                  : "text-brand-text/70 hover:text-brand-text hover:bg-brand-tan/5"
              }`}
            >
              <div className={`min-w-[24px] flex justify-center ${isActive ? "text-white" : "text-inherit"}`}>
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              {isExpanded && (
                <span className="text-base font-semibold whitespace-nowrap animate-in fade-in slide-in-from-left-4 duration-500">
                  {tab.label}
                </span>
              )}
              {!isExpanded && (
                <div className="absolute left-full ml-4 px-3 py-1.5 rounded-xl bg-brand-text-dark text-white text-xs font-medium opacity-0 invisible group-hover:opacity-100 group-hover:visible whitespace-nowrap z-50 transition-all shadow-xl">
                  {tab.label}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Languages & Footer Section */}
      <div className="px-3 py-6 border-t border-brand-tan/10 flex flex-col gap-2 mb-2">
        {/* Language Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-4 p-3.5 text-brand-text/70 hover:text-brand-text hover:bg-brand-tan/5 rounded-[1.25rem] transition-all w-full text-left">
              <Globe size={22} />
              {isExpanded && (
                <span className="text-sm font-semibold flex-1 truncate">{currentLang}</span>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 glass-strong border-brand-tan/10 text-brand-text-dark max-h-80 overflow-y-auto no-scrollbar rounded-2xl shadow-2xl">
            {languages.map((lang) => (
              <DropdownMenuItem 
                key={lang} 
                onClick={() => setCurrentLang(lang)}
                className="flex items-center justify-between hover:bg-brand-tan/10 focus:bg-brand-tan/10 cursor-pointer p-2.5 rounded-lg font-medium"
              >
                <span className="text-sm">{lang}</span>
                {currentLang === lang && <Check size={16} className="text-brand-tan" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <button className="flex items-center gap-4 p-3.5 text-brand-text/70 hover:text-brand-text hover:bg-brand-tan/5 rounded-[1.25rem] transition-all">
          <HelpCircle size={22} />
          {isExpanded && <span className="text-sm font-semibold">Help</span>}
        </button>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-4 p-3.5 text-brand-text/70 hover:text-[#d32f2f] hover:bg-red-50 rounded-[1.25rem] transition-all"
        >
          <LogOut size={22} />
          {isExpanded && <span className="text-sm font-semibold">Logout</span>}
        </button>

        {/* Theme Toggle */}
        <div 
          className={`mt-4 p-1.5 rounded-full bg-brand-soft border border-brand-tan/10 flex items-center transition-all ${
            isExpanded ? "px-2 h-12" : "flex-col py-2 w-12 mx-auto"
          }`}
        >
          <button 
            onClick={() => setTheme("light")}
            className={`flex-1 flex items-center justify-center h-full rounded-full transition-all ${theme === 'light' ? 'bg-brand-tan text-white shadow-md' : 'text-brand-text/40 hover:text-brand-text'}`}
          >
            <Sun size={18} />
          </button>
          <button 
            onClick={() => setTheme("dark")}
            className={`flex-1 flex items-center justify-center h-full rounded-full transition-all ${theme === 'dark' ? 'bg-brand-tan text-white shadow-md' : 'text-brand-text/40 hover:text-brand-text'}`}
          >
            <Moon size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
