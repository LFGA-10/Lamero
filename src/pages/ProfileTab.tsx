import { Calendar, TrendingUp, Award, Heart } from "lucide-react";
import DynamicBackground from "@/components/DynamicBackground";

const stats = [
  { icon: Calendar, label: "Days Active", value: "12" },
  { icon: TrendingUp, label: "Mood Trend", value: "↑ Better" },
  { icon: Award, label: "Streak", value: "5 days" },
  { icon: Heart, label: "Check-ins", value: "28" },
];

const ProfileTab = () => {
  return (
    <div className="relative min-h-screen pb-24">
      <DynamicBackground />
      <div className="relative z-10 px-5 pt-14 max-w-lg mx-auto">
        <div className="flex flex-col items-center mb-8 animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-brown/60 flex items-center justify-center text-3xl mb-3">
            🌸
          </div>
          <h1 className="font-display text-xl font-bold text-primary-foreground">Your Journey</h1>
          <p className="text-primary-foreground/70 text-sm">Growing one day at a time</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="p-4 rounded-2xl bg-brown border border-brown/20 text-center animate-fade-in"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <Icon size={20} className="mx-auto text-brown-foreground/80 mb-2" />
                <p className="text-lg font-bold text-brown-foreground">{stat.value}</p>
                <p className="text-xs text-brown-foreground/60">{stat.label}</p>
              </div>
            );
          })}
        </div>

        <div className="p-5 rounded-2xl bg-brown border border-brown/20 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <h3 className="font-display text-lg font-semibold text-brown-foreground mb-3">Mood History</h3>
          <div className="flex items-end gap-2 h-24">
            {[40, 55, 35, 60, 70, 65, 80].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-lg bg-brown-foreground/30 transition-all"
                  style={{ height: `${h}%` }}
                />
                <span className="text-[9px] text-brown-foreground/60">
                  {["M", "T", "W", "T", "F", "S", "S"][i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
