import { useState } from "react";
import DynamicBackground from "@/components/DynamicBackground";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface AdviceCategory {
  title: string;
  emoji: string;
  tips: string[];
  detail: string;
}

const adviceCategories: AdviceCategory[] = [
  {
    title: "Anxiety",
    emoji: "🌊",
    tips: ["Practice the 5-4-3-2-1 grounding technique", "Limit caffeine and sugar intake", "Try progressive muscle relaxation"],
    detail: "Anxiety is your body's natural response to stress. While uncomfortable, it's manageable. These techniques help activate your parasympathetic nervous system, signaling safety to your brain.",
  },
  {
    title: "Depression",
    emoji: "🌱",
    tips: ["Start with small, achievable daily goals", "Maintain a routine even on hard days", "Reach out to someone you trust"],
    detail: "Depression can make everything feel heavy and pointless. Remember: it's not laziness — it's an illness. Small, consistent steps create momentum even when motivation is absent.",
  },
  {
    title: "Stress",
    emoji: "🍃",
    tips: ["Break tasks into smaller steps", "Set boundaries — it's okay to say no", "Spend time in nature daily"],
    detail: "Chronic stress affects both mind and body. Learning to identify your stressors and respond intentionally rather than reactively is a powerful skill that improves over time.",
  },
  {
    title: "Sleep",
    emoji: "🌙",
    tips: ["Keep a consistent sleep schedule", "Avoid screens 1 hour before bed", "Try a calming bedtime ritual"],
    detail: "Quality sleep is foundational to mental health. Your brain processes emotions and consolidates memories during sleep. Prioritizing sleep hygiene can transform your days.",
  },
  {
    title: "Self-Worth",
    emoji: "✨",
    tips: ["Write 3 things you appreciate about yourself", "Celebrate small wins every day", "Replace 'I should' with 'I choose to'"],
    detail: "Self-worth isn't earned through achievement — it's inherent. Building self-compassion means treating yourself with the same kindness you'd offer a close friend.",
  },
];

const AdviceTab = () => {
  const [selectedCategory, setSelectedCategory] = useState<AdviceCategory | null>(null);

  return (
    <div className="relative min-h-screen pb-24">
      <DynamicBackground />
      <div className="relative z-10 px-5 pt-14 max-w-lg mx-auto">
        <h1 className="font-display text-2xl font-bold text-primary-foreground mb-1">Advice</h1>
        <p className="text-primary-foreground/70 text-sm mb-6">Evidence-based tips for your journey</p>
        <div className="space-y-4">
          {adviceCategories.map((cat, i) => (
            <div
              key={cat.title}
              onClick={() => setSelectedCategory(cat)}
              className="p-5 rounded-2xl bg-brown border border-brown/20 animate-fade-in cursor-pointer hover:shadow-md transition-all active:scale-[0.98]"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{cat.emoji}</span>
                <h3 className="font-display text-lg font-semibold text-brown-foreground">{cat.title}</h3>
              </div>
              <ul className="space-y-2">
                {cat.tips.map((tip, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-brown-foreground/80">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brown-foreground/40 shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedCategory} onOpenChange={(o) => !o && setSelectedCategory(null)}>
        <DialogContent className="bg-brown border-brown/20 text-brown-foreground">
          <DialogHeader>
            <DialogTitle className="font-display text-brown-foreground">
              {selectedCategory?.emoji} {selectedCategory?.title}
            </DialogTitle>
            <DialogDescription className="text-brown-foreground/70">
              Understanding & managing {selectedCategory?.title.toLowerCase()}
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm text-brown-foreground/90 leading-relaxed">{selectedCategory?.detail}</p>
          <div className="space-y-2 mt-3">
            <h4 className="text-xs uppercase tracking-wider text-brown-foreground/60 font-semibold">Key Tips</h4>
            {selectedCategory?.tips.map((tip, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-brown-foreground/10 text-sm text-brown-foreground/90">
                <span className="text-base">💡</span>
                {tip}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdviceTab;
