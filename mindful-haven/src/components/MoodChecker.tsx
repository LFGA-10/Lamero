import { useState } from "react";

const moods = [
  { emoji: "😊", label: "Happy" },
  { emoji: "😌", label: "Calm" },
  { emoji: "😔", label: "Sad" },
  { emoji: "😰", label: "Anxious" },
  { emoji: "😤", label: "Frustrated" },
  { emoji: "😴", label: "Tired" },
];

const MoodChecker = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="rounded-2xl p-6 animate-fade-in bg-brown border border-brown/20">
      <h2 className="font-display text-xl font-semibold text-brown-foreground mb-1">
        How are you feeling?
      </h2>
      <p className="text-brown-foreground/70 text-sm mb-5 font-body">
        Take a moment to check in with yourself
      </p>
      <div className="grid grid-cols-3 gap-3">
        {moods.map((mood) => (
          <button
            key={mood.label}
            onClick={() => setSelected(mood.label)}
            className={`flex flex-col items-center gap-1.5 p-4 rounded-xl transition-all duration-300 ${
              selected === mood.label
                ? "bg-brown-foreground/20 scale-105 shadow-lg"
                : "bg-brown-foreground/5 hover:bg-brown-foreground/10 hover:scale-102"
            }`}
          >
            <span className="text-3xl">{mood.emoji}</span>
            <span className="text-xs font-medium text-brown-foreground/80">
              {mood.label}
            </span>
          </button>
        ))}
      </div>
      {selected && (
        <div className="mt-4 p-4 rounded-xl bg-brown-foreground/10 animate-fade-in">
          <p className="text-sm text-brown-foreground/90">
            It's okay to feel <span className="font-semibold">{selected.toLowerCase()}</span>. 
            Remember, every emotion is valid and temporary. 💛
          </p>
        </div>
      )}
    </div>
  );
};

export default MoodChecker;
