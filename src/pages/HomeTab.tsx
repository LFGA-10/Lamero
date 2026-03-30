import { useState } from "react";
import DynamicBackground from "@/components/DynamicBackground";
import MoodChecker from "@/components/MoodChecker";
import QuoteCard from "@/components/QuoteCard";
import { Heart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const HomeTab = () => {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  const [openAction, setOpenAction] = useState<"breathe" | "journal" | null>(null);
  const [breatheStep, setBreatheStep] = useState<"inhale" | "hold" | "exhale">("inhale");

  const startBreathing = () => {
    setOpenAction("breathe");
    setBreatheStep("inhale");
    const cycle = () => {
      setBreatheStep("inhale");
      setTimeout(() => setBreatheStep("hold"), 4000);
      setTimeout(() => setBreatheStep("exhale"), 7000);
    };
    cycle();
  };

  return (
    <div className="relative min-h-screen pb-24">
      <DynamicBackground />
      <div className="relative z-10 px-5 pt-14 max-w-lg mx-auto space-y-6">
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

        <div className="grid grid-cols-2 gap-3 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <div
            onClick={startBreathing}
            className="rounded-2xl p-5 flex flex-col items-center gap-2 hover:scale-105 transition-transform cursor-pointer bg-brown border border-brown/20 active:scale-95"
          >
            <span className="text-2xl">🧘</span>
            <span className="text-sm font-medium text-brown-foreground">Breathe</span>
          </div>
          <div
            onClick={() => setOpenAction("journal")}
            className="rounded-2xl p-5 flex flex-col items-center gap-2 hover:scale-105 transition-transform cursor-pointer bg-brown border border-brown/20 active:scale-95"
          >
            <span className="text-2xl">📝</span>
            <span className="text-sm font-medium text-brown-foreground">Journal</span>
          </div>
        </div>
      </div>

      {/* Breathe Dialog */}
      <Dialog open={openAction === "breathe"} onOpenChange={(o) => !o && setOpenAction(null)}>
        <DialogContent className="bg-brown border-brown/20 text-brown-foreground">
          <DialogHeader>
            <DialogTitle className="font-display text-brown-foreground">🧘 Breathing Exercise</DialogTitle>
            <DialogDescription className="text-brown-foreground/70">
              Follow the rhythm to calm your mind
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center py-8 gap-6">
            <div
              className={`w-32 h-32 rounded-full bg-brown-foreground/20 flex items-center justify-center transition-all duration-[4000ms] ${
                breatheStep === "inhale" ? "scale-125" : breatheStep === "exhale" ? "scale-75" : "scale-110"
              }`}
            >
              <span className="text-lg font-display font-semibold text-brown-foreground capitalize">
                {breatheStep}
              </span>
            </div>
            <p className="text-sm text-brown-foreground/70 text-center">
              {breatheStep === "inhale" && "Breathe in slowly through your nose..."}
              {breatheStep === "hold" && "Hold your breath gently..."}
              {breatheStep === "exhale" && "Breathe out slowly through your mouth..."}
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Journal Dialog */}
      <Dialog open={openAction === "journal"} onOpenChange={(o) => !o && setOpenAction(null)}>
        <DialogContent className="bg-brown border-brown/20 text-brown-foreground">
          <DialogHeader>
            <DialogTitle className="font-display text-brown-foreground">📝 Quick Journal</DialogTitle>
            <DialogDescription className="text-brown-foreground/70">
              Write freely — no one else will see this
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <p className="text-sm text-brown-foreground/80 italic">
              Prompt: What is one thing you're grateful for today?
            </p>
            <textarea
              placeholder="Start writing..."
              className="w-full bg-brown-foreground/10 rounded-xl p-4 text-sm text-brown-foreground placeholder:text-brown-foreground/50 resize-none focus:outline-none focus:ring-1 focus:ring-brown-foreground/30 min-h-[150px]"
              rows={6}
            />
            <button className="w-full py-2.5 rounded-xl bg-brown-foreground/20 text-brown-foreground text-sm font-medium hover:bg-brown-foreground/30 transition-colors">
              Save Entry
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HomeTab;
