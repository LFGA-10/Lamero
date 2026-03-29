import { Calendar, TrendingUp, Award, Heart } from "lucide-react";

const stats = [
  { icon: Calendar, label: "Days Active", value: "12" },
  { icon: TrendingUp, label: "Mood Trend", value: "↑ Better" },
  { icon: Award, label: "Streak", value: "5 days" },
  { icon: Heart, label: "Check-ins", value: "28" },
];

const ProfileTab = () => {
  return (
    <div className="min-h-screen bg-background pb-24 px-5 pt-14 max-w-lg mx-auto">
      <div className="flex flex-col items-center mb-8 animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-3xl mb-3">
          🌸
        </div>
        <h1 className="font-display text-xl font-bold text-foreground">Your Journey</h1>
        <p className="text-muted-foreground text-sm">Growing one day at a time</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="p-4 rounded-2xl bg-card border border-border text-center animate-fade-in"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <Icon size={20} className="mx-auto text-primary mb-2" />
              <p className="text-lg font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="p-5 rounded-2xl bg-card border border-border animate-fade-in" style={{ animationDelay: "0.4s" }}>
        <h3 className="font-display text-lg font-semibold text-foreground mb-3">Mood History</h3>
        <div className="flex items-end gap-2 h-24">
          {[40, 55, 35, 60, 70, 65, 80].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full rounded-t-lg bg-primary/30 transition-all"
                style={{ height: `${h}%` }}
              />
              <span className="text-[9px] text-muted-foreground">
                {["M", "T", "W", "T", "F", "S", "S"][i]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
