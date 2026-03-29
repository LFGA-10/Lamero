import { Clock, Headphones, Wind, PenLine, Palette, Dumbbell } from "lucide-react";

const activities = [
  { icon: Wind, title: "Breathing Exercise", duration: "5 min", color: "bg-calm", desc: "Calm your mind with guided breathing" },
  { icon: Headphones, title: "Guided Meditation", duration: "10 min", color: "bg-serene", desc: "Find inner peace with soothing guidance" },
  { icon: PenLine, title: "Gratitude Journal", duration: "5 min", color: "bg-warm", desc: "Write down what you're thankful for" },
  { icon: Palette, title: "Art Therapy", duration: "15 min", color: "bg-gentle", desc: "Express yourself through colors" },
  { icon: Dumbbell, title: "Gentle Yoga", duration: "20 min", color: "bg-calm", desc: "Stretch and release tension" },
  { icon: Headphones, title: "Sleep Stories", duration: "15 min", color: "bg-serene", desc: "Drift off to peaceful sleep" },
];

const ActivitiesTab = () => {
  return (
    <div className="min-h-screen bg-background pb-24 px-5 pt-14 max-w-lg mx-auto">
      <h1 className="font-display text-2xl font-bold text-foreground mb-1">Activities</h1>
      <p className="text-muted-foreground text-sm mb-6">Healing exercises designed for you</p>
      <div className="space-y-3">
        {activities.map((activity, i) => {
          const Icon = activity.icon;
          return (
            <div
              key={i}
              className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border hover:shadow-md transition-all cursor-pointer animate-fade-in"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className={`p-3 rounded-xl ${activity.color}`}>
                <Icon size={22} className="text-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground text-sm">{activity.title}</h3>
                <p className="text-muted-foreground text-xs mt-0.5">{activity.desc}</p>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock size={12} />
                <span className="text-xs">{activity.duration}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivitiesTab;
