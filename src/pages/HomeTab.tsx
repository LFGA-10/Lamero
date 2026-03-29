import DynamicBackground from "@/components/DynamicBackground";
import MoodChecker from "@/components/MoodChecker";
import QuoteCard from "@/components/QuoteCard";
import { Heart } from "lucide-react";

const HomeTab = () => {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="relative min-h-screen pb-24">
      <DynamicBackground />
      <div className="relative z-10 px-5 pt-14 max-w-lg mx-auto space-y-6">
        {/* Header */}
        <div className="animate-fade-in">
          <div className="flex items-center gap-2 mb-1">
            <Heart size={18} className="text-primary-foreground/80" />
            <span className="text-sm font-medium text-primary-foreground/70 tracking-wide uppercase">
              MindBloom
            </span>
          </div>
          <h1 className="font-display text-3xl font-bold text-primary-foreground">
            {greeting}
          </h1>
          <p className="text-primary-foreground/70 text-sm mt-1 font-body">
            Let's nurture your inner peace today
          </p>
        </div>

        <MoodChecker />
        <QuoteCard />

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <div className="glass rounded-2xl p-5 flex flex-col items-center gap-2 hover:scale-105 transition-transform cursor-pointer">
            <span className="text-2xl">🧘</span>
            <span className="text-sm font-medium text-primary-foreground">Breathe</span>
          </div>
          <div className="glass rounded-2xl p-5 flex flex-col items-center gap-2 hover:scale-105 transition-transform cursor-pointer">
            <span className="text-2xl">📝</span>
            <span className="text-sm font-medium text-primary-foreground">Journal</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeTab;
