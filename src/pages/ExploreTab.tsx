import { BookOpen, Users, Podcast, Video, Globe, Sparkles } from "lucide-react";

const resources = [
  { icon: BookOpen, title: "Articles & Guides", desc: "In-depth reads on mental wellness", color: "bg-calm" },
  { icon: Users, title: "Community", desc: "Connect with others on the same path", color: "bg-serene" },
  { icon: Podcast, title: "Podcasts", desc: "Listen to mental health conversations", color: "bg-warm" },
  { icon: Video, title: "Video Sessions", desc: "Watch therapeutic content", color: "bg-gentle" },
  { icon: Globe, title: "Crisis Resources", desc: "Immediate help when you need it", color: "bg-destructive/20" },
  { icon: Sparkles, title: "Wellness Challenges", desc: "7-day programs to build habits", color: "bg-calm" },
];

const ExploreTab = () => {
  return (
    <div className="min-h-screen bg-background pb-24 px-5 pt-14 max-w-lg mx-auto">
      <h1 className="font-display text-2xl font-bold text-foreground mb-1">Explore</h1>
      <p className="text-muted-foreground text-sm mb-6">Discover resources to support you</p>
      <div className="grid grid-cols-2 gap-3">
        {resources.map((r, i) => {
          const Icon = r.icon;
          return (
            <div
              key={i}
              className="p-5 rounded-2xl bg-card border border-border flex flex-col items-center text-center gap-3 hover:shadow-md transition-all cursor-pointer animate-fade-in"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className={`p-3 rounded-xl ${r.color}`}>
                <Icon size={24} className="text-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm">{r.title}</h3>
                <p className="text-muted-foreground text-xs mt-1">{r.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExploreTab;
