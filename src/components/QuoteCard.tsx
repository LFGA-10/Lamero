import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";

const quotes = [
  { text: "You don't have to control your thoughts. You just have to stop letting them control you.", author: "Dan Millman" },
  { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela" },
  { text: "You are not your illness. You have a name, a history, a personality. Staying yourself is part of the battle.", author: "Julian Seifter" },
  { text: "There is hope, even when your brain tells you there isn't.", author: "John Green" },
  { text: "Healing takes time, and asking for help is a courageous step.", author: "Mariska Hargitay" },
  { text: "You are allowed to be both a masterpiece and a work in progress.", author: "Sophia Bush" },
  { text: "The only journey is the journey within.", author: "Rainer Maria Rilke" },
  { text: "Almost everything will work again if you unplug it for a few minutes. Including you.", author: "Anne Lamott" },
  { text: "Self-care is not self-indulgence, it is self-preservation.", author: "Audre Lorde" },
  { text: "What mental health needs is more sunlight, more candor, and more unashamed conversation.", author: "Glenn Close" },
];

const QuoteCard = () => {
  const [index, setIndex] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);

  useEffect(() => {
    setIndex(Math.floor(Math.random() * quotes.length));
  }, []);

  const nextQuote = () => {
    setIndex((prev) => (prev + 1) % quotes.length);
    setFadeKey((k) => k + 1);
  };

  const quote = quotes[index];

  return (
    <div className="glass rounded-2xl p-6 animate-fade-in bg-serene/40" style={{ animationDelay: "0.2s" }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg font-semibold text-primary-foreground">
          Daily Inspiration
        </h3>
        <button
          onClick={nextQuote}
          className="p-2 rounded-full bg-card/40 hover:bg-card/60 transition-colors text-primary-foreground/70 hover:text-primary-foreground"
        >
          <RefreshCw size={16} />
        </button>
      </div>
      <div key={fadeKey} className="animate-fade-in">
        <p className="text-primary-foreground/90 text-base italic leading-relaxed font-body">
          "{quote.text}"
        </p>
        <p className="text-primary-foreground/60 text-sm mt-3 font-medium">
          — {quote.author}
        </p>
      </div>
    </div>
  );
};

export default QuoteCard;
