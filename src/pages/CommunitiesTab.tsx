import { Users, MessageCircle, Heart, Shield, Flower2, Sun } from "lucide-react";

const communities = [
  { icon: Heart, title: "Anxiety Support", members: "2.4k", desc: "Share experiences and coping strategies", color: "bg-warm/40" },
  { icon: Shield, title: "PTSD Warriors", members: "1.1k", desc: "A safe space for trauma survivors", color: "bg-calm/40" },
  { icon: Flower2, title: "Depression Recovery", members: "3.2k", desc: "Walk the path to healing together", color: "bg-serene/40" },
  { icon: Sun, title: "Mindfulness Circle", members: "1.8k", desc: "Practice presence and awareness", color: "bg-gentle/40" },
  { icon: Users, title: "Grief & Loss", members: "980", desc: "Find comfort in shared understanding", color: "bg-warm/40" },
  { icon: MessageCircle, title: "Teen Mental Health", members: "2.1k", desc: "Young voices, strong support", color: "bg-calm/40" },
];

const CommunitiesTab = () => {
  return (
    <div className="min-h-screen bg-background pb-24 px-5 pt-14 max-w-lg mx-auto">
      <h1 className="font-display text-2xl font-bold text-foreground mb-1">Communities</h1>
      <p className="text-muted-foreground text-sm mb-6">Connect with people who understand</p>
      <div className="space-y-3">
        {communities.map((c, i) => {
          const Icon = c.icon;
          return (
            <div
              key={i}
              className={`flex items-center gap-4 p-4 rounded-2xl ${c.color} border border-border hover:shadow-md transition-all cursor-pointer animate-fade-in`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="p-3 rounded-xl bg-card/60">
                <Icon size={22} className="text-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground text-sm">{c.title}</h3>
                <p className="text-muted-foreground text-xs mt-0.5">{c.desc}</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-medium text-primary">{c.members}</span>
                <p className="text-[10px] text-muted-foreground">members</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommunitiesTab;
