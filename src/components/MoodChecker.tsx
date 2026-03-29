import { useState } from "react";

const moods = [
  { emoji: "😊", label: "Happy", color: "bg-gentle" },
  { emoji: "😌", label: "Calm", color: "bg-calm" },
  { emoji: "😔", label: "Sad", color: "bg-serene" },
  { emoji: "😰", label: "Anxious", color: "bg-warm" },
  { emoji: "😤", label: "Frustrated", color: "bg-destructive/20" },
  { emoji: "😴", label: "Tired", color: "bg-muted" },
];

const MoodChecker = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="glass rounded-2xl p-6 animate-fade-in bg-calm/40">
      <h2 className="font-display text-xl font-semibold text-primary-foreground mb-1">
        How are you feeling?
      </h2>
      <p className="text-primary-foreground/70 text-sm mb-5 font-body">
        Take a moment to check in with yourself
      </p>
      <div className="grid grid-cols-3 gap-3">
        {moods.map((mood) => (
          <button
            key={mood.label}
            onClick={() => setSelected(mood.label)}
            className={`flex flex-col items-center gap-1.5 p-4 rounded-xl transition-all duration-300 ${
              selected === mood.label
                ? `${mood.color} scale-105 shadow-lg`
                : "bg-card/40 hover:bg-card/60 hover:scale-102"
            }`}
          >
            <span className="text-3xl">{mood.emoji}</span>
            <span
              className={`text-xs font-medium ${
                selected === mood.label ? "text-foreground" : "text-primary-foreground/80"
              }`}
            >
              {mood.label}
            </span>
          </button>
        ))}
      </div>
      {selected && (
        <div className="mt-4 p-4 rounded-xl bg-card/50 animate-fade-in">
          <p className="text-sm text-primary-foreground/90">
            It's okay to feel <span className="font-semibold">{selected.toLowerCase()}</span>. 
            Remember, every emotion is valid and temporary. 💛
          </p>
        </div>
      )}
    </div>
  );
};

export default MoodChecker;
