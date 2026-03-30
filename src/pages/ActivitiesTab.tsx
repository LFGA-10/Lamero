import { useState } from "react";
import { Clock, Headphones, Wind, PenLine, Palette, Dumbbell } from "lucide-react";
import DynamicBackground from "@/components/DynamicBackground";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface Activity {
  icon: typeof Wind;
  title: string;
  duration: string;
  desc: string;
  fullDesc: string;
  steps: string[];
}

const activities: Activity[] = [
  { icon: Wind, title: "Breathing Exercise", duration: "5 min", desc: "Calm your mind with guided breathing", fullDesc: "This breathing exercise uses the 4-7-8 technique to activate your parasympathetic nervous system, reducing anxiety and promoting calm.", steps: ["Find a comfortable seated position", "Inhale through your nose for 4 seconds", "Hold your breath for 7 seconds", "Exhale through your mouth for 8 seconds", "Repeat 4 times"] },
  { icon: Headphones, title: "Guided Meditation", duration: "10 min", desc: "Find inner peace with soothing guidance", fullDesc: "A gentle guided meditation focusing on body awareness and releasing tension from head to toe.", steps: ["Put on headphones in a quiet space", "Close your eyes and settle in", "Follow the voice guiding your awareness", "Notice sensations without judgment", "Slowly return when ready"] },
  { icon: PenLine, title: "Gratitude Journal", duration: "5 min", desc: "Write down what you're thankful for", fullDesc: "Gratitude journaling rewires your brain to focus on the positive, improving mood and overall well-being over time.", steps: ["Open your journal or a blank page", "Write 3 things you're grateful for today", "For each, note why it matters to you", "Read them back to yourself", "Notice how you feel afterward"] },
  { icon: Palette, title: "Art Therapy", duration: "15 min", desc: "Express yourself through colors", fullDesc: "Art therapy lets you process emotions non-verbally. There are no rules — just let your feelings flow onto the canvas.", steps: ["Gather colors or open a drawing app", "Choose colors that match your mood", "Draw freely without planning", "Let shapes and patterns emerge naturally", "Reflect on what you created"] },
  { icon: Dumbbell, title: "Gentle Yoga", duration: "20 min", desc: "Stretch and release tension", fullDesc: "Gentle yoga combines slow movements with breath awareness to release physical tension and quiet the mind.", steps: ["Start with child's pose", "Move into cat-cow stretches", "Flow through gentle sun salutations", "Hold warrior poses for strength", "End with savasana for 5 minutes"] },
  { icon: Headphones, title: "Sleep Stories", duration: "15 min", desc: "Drift off to peaceful sleep", fullDesc: "Calming narratives designed to quiet your racing thoughts and gently guide you into restful sleep.", steps: ["Get into bed and dim the lights", "Put on comfortable headphones", "Close your eyes and listen", "Let go of the day's worries", "Allow sleep to come naturally"] },
];

const ActivitiesTab = () => {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

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
                onClick={() => setSelectedActivity(activity)}
                className="flex items-center gap-4 p-4 rounded-2xl bg-brown border border-brown/20 hover:shadow-md transition-all cursor-pointer animate-fade-in active:scale-[0.98]"
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

      <Dialog open={!!selectedActivity} onOpenChange={(o) => !o && setSelectedActivity(null)}>
        <DialogContent className="bg-brown border-brown/20 text-brown-foreground">
          <DialogHeader>
            <DialogTitle className="font-display text-brown-foreground">
              {selectedActivity && (() => { const Icon = selectedActivity.icon; return <Icon size={20} className="inline mr-2 -mt-1" />; })()}
              {selectedActivity?.title}
            </DialogTitle>
            <DialogDescription className="text-brown-foreground/70">
              {selectedActivity?.duration} · {selectedActivity?.desc}
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm text-brown-foreground/90 leading-relaxed">{selectedActivity?.fullDesc}</p>
          <div className="space-y-2 mt-2">
            <h4 className="text-xs uppercase tracking-wider text-brown-foreground/60 font-semibold">Steps</h4>
            {selectedActivity?.steps.map((step, i) => (
              <div key={i} className="flex items-start gap-3 text-sm text-brown-foreground/90">
                <span className="w-5 h-5 rounded-full bg-brown-foreground/20 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {i + 1}
                </span>
                {step}
              </div>
            ))}
          </div>
          <button className="w-full py-2.5 rounded-xl bg-brown-foreground/20 text-brown-foreground text-sm font-medium hover:bg-brown-foreground/30 transition-colors mt-3">
            Start Activity
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ActivitiesTab;
