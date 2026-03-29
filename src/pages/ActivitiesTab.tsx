import { Clock, Headphones, Wind, PenLine, Palette, Dumbbell } from "lucide-react";
import DynamicBackground from "@/components/DynamicBackground";

const activities = [
  { icon: Wind, title: "Breathing Exercise", duration: "5 min", desc: "Calm your mind with guided breathing" },
  { icon: Headphones, title: "Guided Meditation", duration: "10 min", desc: "Find inner peace with soothing guidance" },
  { icon: PenLine, title: "Gratitude Journal", duration: "5 min", desc: "Write down what you're thankful for" },
  { icon: Palette, title: "Art Therapy", duration: "15 min", desc: "Express yourself through colors" },
  { icon: Dumbbell, title: "Gentle Yoga", duration: "20 min", desc: "Stretch and release tension" },
  { icon: Headphones, title: "Sleep Stories", duration: "15 min", desc: "Drift off to peaceful sleep" },
];

const ActivitiesTab = () => {
  return (
    <div className="relative min-h-screen pb-24">
      <DynamicBackground />
      <div className="relative z-10 px-5 pt-14 max-w-lg mx-auto">
        <h1 className="font-display text-2xl font-bold text-primary-foreground mb-1">Activities</h1>
        <p className="text-primary-foreground/70 text-sm mb-6">Healing exercises designed for you</p>
        <div className="space-y-3">
          {activities.map((activity, i) => {
            const Icon = activity.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-4 p-4 rounded-2xl bg-brown border border-brown/20 hover:shadow-md transition-all cursor-pointer animate-fade-in"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="p-3 rounded-xl bg-brown-foreground/10">
                  <Icon size={22} className="text-brown-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-brown-foreground text-sm">{activity.title}</h3>
                  <p className="text-brown-foreground/70 text-xs mt-0.5">{activity.desc}</p>
                </div>
                <div className="flex items-center gap-1 text-brown-foreground/60">
                  <Clock size={12} />
                  <span className="text-xs">{activity.duration}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ActivitiesTab;
