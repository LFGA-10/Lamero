import { useState } from "react";
import { Calendar, TrendingUp, Award, Heart } from "lucide-react";
import DynamicBackground from "@/components/DynamicBackground";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface Stat {
  icon: typeof Calendar;
  label: string;
  value: string;
  detail: string;
}

const stats: Stat[] = [
  { icon: Calendar, label: "Days Active", value: "12", detail: "You've been on your wellness journey for 12 days. Consistency is key — even showing up on tough days counts." },
  { icon: TrendingUp, label: "Mood Trend", value: "↑ Better", detail: "Your mood has been trending upward over the past week. Activities like breathing exercises and journaling appear to be helping." },
  { icon: Award, label: "Streak", value: "5 days", detail: "You've checked in for 5 consecutive days! Keep the momentum going — streaks build habits." },
  { icon: Heart, label: "Check-ins", value: "28", detail: "You've completed 28 mood check-ins so far. Each one helps you understand your emotional patterns better." },
];

const moodDays = [
  { day: "M", value: 40, mood: "Anxious" },
  { day: "T", value: 55, mood: "Calm" },
  { day: "W", value: 35, mood: "Sad" },
  { day: "T", value: 60, mood: "Happy" },
  { day: "F", value: 70, mood: "Calm" },
  { day: "S", value: 65, mood: "Happy" },
  { day: "S", value: 80, mood: "Happy" },
];

const ProfileTab = () => {
  const [selectedStat, setSelectedStat] = useState<Stat | null>(null);
  const [selectedDay, setSelectedDay] = useState<typeof moodDays[0] | null>(null);

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
                onClick={() => setSelectedStat(stat)}
                className="p-4 rounded-2xl bg-brown border border-brown/20 text-center animate-fade-in cursor-pointer hover:shadow-md transition-all active:scale-[0.98]"
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
            {moodDays.map((d, i) => (
              <div
                key={i}
                onClick={() => setSelectedDay(d)}
                className="flex-1 flex flex-col items-center gap-1 cursor-pointer group"
              >
                <div
                  className="w-full rounded-t-lg bg-brown-foreground/30 transition-all group-hover:bg-brown-foreground/50"
                  style={{ height: `${d.value}%` }}
                />
                <span className="text-[9px] text-brown-foreground/60">{d.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stat Detail Dialog */}
      <Dialog open={!!selectedStat} onOpenChange={(o) => !o && setSelectedStat(null)}>
        <DialogContent className="bg-brown border-brown/20 text-brown-foreground">
          <DialogHeader>
            <DialogTitle className="font-display text-brown-foreground">
              {selectedStat && (() => { const Icon = selectedStat.icon; return <Icon size={20} className="inline mr-2 -mt-1" />; })()}
              {selectedStat?.label}
            </DialogTitle>
            <DialogDescription className="text-brown-foreground/70">
              Current: {selectedStat?.value}
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm text-brown-foreground/90 leading-relaxed">{selectedStat?.detail}</p>
        </DialogContent>
      </Dialog>

      {/* Mood Day Dialog */}
      <Dialog open={!!selectedDay} onOpenChange={(o) => !o && setSelectedDay(null)}>
        <DialogContent className="bg-brown border-brown/20 text-brown-foreground">
          <DialogHeader>
            <DialogTitle className="font-display text-brown-foreground">
              {selectedDay?.day === "M" ? "Monday" : selectedDay?.day === "T" ? "Tuesday/Thursday" : selectedDay?.day === "W" ? "Wednesday" : selectedDay?.day === "F" ? "Friday" : selectedDay?.day === "S" ? "Saturday/Sunday" : ""}'s Mood
            </DialogTitle>
            <DialogDescription className="text-brown-foreground/70">
              Mood score: {selectedDay?.value}%
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center py-4 gap-3">
            <div className="w-20 h-20 rounded-full bg-brown-foreground/20 flex items-center justify-center">
              <span className="text-3xl">
                {selectedDay?.mood === "Happy" ? "😊" : selectedDay?.mood === "Calm" ? "😌" : selectedDay?.mood === "Sad" ? "😔" : "😰"}
              </span>
            </div>
            <p className="text-lg font-semibold text-brown-foreground">{selectedDay?.mood}</p>
            <p className="text-sm text-brown-foreground/70 text-center">
              Your mood was at {selectedDay?.value}% on this day. Keep tracking to see patterns over time.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileTab;
