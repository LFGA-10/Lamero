import { useState } from "react";
import { Bell, Shield, Moon, Volume2, Globe, Info, ChevronRight } from "lucide-react";
import DynamicBackground from "@/components/DynamicBackground";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface SettingItem {
  icon: typeof Bell;
  label: string;
  value: string;
  type: "toggle" | "select" | "info";
  description: string;
}

const settingGroups: { title: string; items: SettingItem[] }[] = [
  {
    title: "Preferences",
    items: [
      { icon: Bell, label: "Notifications", value: "On", type: "toggle", description: "Enable or disable push notifications for reminders, mood check-ins, and community updates." },
      { icon: Moon, label: "Dark Mode", value: "Off", type: "toggle", description: "Switch to a darker theme that's easier on the eyes in low-light environments." },
      { icon: Volume2, label: "Sound", value: "On", type: "toggle", description: "Toggle sounds for meditation timers, breathing exercises, and UI interactions." },
      { icon: Globe, label: "Language", value: "English", type: "select", description: "Choose your preferred language for the app interface and content." },
    ],
  },
  {
    title: "Support",
    items: [
      { icon: Shield, label: "Privacy Policy", value: "", type: "info", description: "Your data is encrypted and never shared with third parties. We collect only what's needed to personalize your experience. You can delete your data at any time." },
      { icon: Info, label: "About MindBloom", value: "v1.0", type: "info", description: "MindBloom is a mental wellness companion designed to help you navigate your emotional journey with tools for breathing, journaling, meditation, and community support." },
    ],
  },
];

const SettingsTab = () => {
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    Notifications: true,
    "Dark Mode": false,
    Sound: true,
  });
  const [selectedSetting, setSelectedSetting] = useState<SettingItem | null>(null);

  const handleTap = (item: SettingItem) => {
    if (item.type === "toggle") {
      setToggles((prev) => ({ ...prev, [item.label]: !prev[item.label] }));
    } else {
      setSelectedSetting(item);
    }
  };

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
                const isToggle = item.type === "toggle";
                const isOn = toggles[item.label];
                return (
                  <button
                    key={i}
                    onClick={() => handleTap(item)}
                    className="w-full flex items-center gap-3 p-4 hover:bg-brown-foreground/5 transition-colors active:bg-brown-foreground/10"
                  >
                    <Icon size={18} className="text-brown-foreground/70" />
                    <span className="flex-1 text-sm text-brown-foreground text-left">{item.label}</span>
                    {isToggle ? (
                      <div className={`w-10 h-6 rounded-full transition-colors flex items-center px-0.5 ${isOn ? "bg-brown-foreground/30" : "bg-brown-foreground/10"}`}>
                        <div className={`w-5 h-5 rounded-full bg-brown-foreground transition-transform ${isOn ? "translate-x-4" : "translate-x-0"}`} />
                      </div>
                    ) : (
                      <>
                        {item.value && <span className="text-xs text-brown-foreground/60">{item.value}</span>}
                        <ChevronRight size={16} className="text-brown-foreground/40" />
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedSetting} onOpenChange={(o) => !o && setSelectedSetting(null)}>
        <DialogContent className="bg-brown border-brown/20 text-brown-foreground">
          <DialogHeader>
            <DialogTitle className="font-display text-brown-foreground">
              {selectedSetting && (() => { const Icon = selectedSetting.icon; return <Icon size={20} className="inline mr-2 -mt-1" />; })()}
              {selectedSetting?.label}
            </DialogTitle>
            <DialogDescription className="text-brown-foreground/70">
              {selectedSetting?.value || "Information"}
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm text-brown-foreground/90 leading-relaxed">{selectedSetting?.description}</p>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SettingsTab;
