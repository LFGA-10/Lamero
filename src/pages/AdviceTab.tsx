import DynamicBackground from "@/components/DynamicBackground";

const adviceCategories = [
  {
    title: "Anxiety",
    emoji: "🌊",
    tips: [
      "Practice the 5-4-3-2-1 grounding technique",
      "Limit caffeine and sugar intake",
      "Try progressive muscle relaxation",
    ],
  },
  {
    title: "Depression",
    emoji: "🌱",
    tips: [
      "Start with small, achievable daily goals",
      "Maintain a routine even on hard days",
      "Reach out to someone you trust",
    ],
  },
  {
    title: "Stress",
    emoji: "🍃",
    tips: [
      "Break tasks into smaller steps",
      "Set boundaries — it's okay to say no",
      "Spend time in nature daily",
    ],
  },
  {
    title: "Sleep",
    emoji: "🌙",
    tips: [
      "Keep a consistent sleep schedule",
      "Avoid screens 1 hour before bed",
      "Try a calming bedtime ritual",
    ],
  },
  {
    title: "Self-Worth",
    emoji: "✨",
    tips: [
      "Write 3 things you appreciate about yourself",
      "Celebrate small wins every day",
      "Replace 'I should' with 'I choose to'",
    ],
  },
];

const AdviceTab = () => {
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
              className="p-5 rounded-2xl bg-brown border border-brown/20 animate-fade-in"
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
    </div>
  );
};

export default AdviceTab;
