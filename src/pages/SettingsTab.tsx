import { Bell, Shield, Moon, Volume2, Globe, Info, ChevronRight } from "lucide-react";
import DynamicBackground from "@/components/DynamicBackground";

const settingGroups = [
  {
    title: "Preferences",
    items: [
      { icon: Bell, label: "Notifications", value: "On" },
      { icon: Moon, label: "Dark Mode", value: "Off" },
      { icon: Volume2, label: "Sound", value: "On" },
      { icon: Globe, label: "Language", value: "English" },
    ],
  },
  {
    title: "Support",
    items: [
      { icon: Shield, label: "Privacy Policy", value: "" },
      { icon: Info, label: "About MindBloom", value: "v1.0" },
    ],
  },
];

const SettingsTab = () => {
  return (
    <div className="relative min-h-screen pb-24">
      <DynamicBackground />
      <div className="relative z-10 px-5 pt-14 max-w-lg mx-auto">
        <h1 className="font-display text-2xl font-bold text-primary-foreground mb-6">Settings</h1>
        {settingGroups.map((group, gi) => (
          <div key={gi} className="mb-6 animate-fade-in" style={{ animationDelay: `${gi * 0.15}s` }}>
            <h3 className="text-xs uppercase tracking-wider text-primary-foreground/60 font-semibold mb-3 px-1">
              {group.title}
            </h3>
            <div className="bg-brown rounded-2xl border border-brown/20 overflow-hidden divide-y divide-brown-foreground/10">
              {group.items.map((item, i) => {
                const Icon = item.icon;
                return (
                  <button
                    key={i}
                    className="w-full flex items-center gap-3 p-4 hover:bg-brown-foreground/5 transition-colors"
                  >
                    <Icon size={18} className="text-brown-foreground/70" />
                    <span className="flex-1 text-sm text-brown-foreground text-left">{item.label}</span>
                    {item.value && (
                      <span className="text-xs text-brown-foreground/60">{item.value}</span>
                    )}
                    <ChevronRight size={16} className="text-brown-foreground/40" />
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsTab;
