import { useState } from "react";
import DynamicBackground from "@/components/DynamicBackground";
import { Sparkles, Heart, Feather, BookOpen, Quote, Image as ImageIcon } from "lucide-react";

type Category = "all" | "poems" | "stories" | "reflections" | "art";

interface Writing {
  category: Category;
  title: string;
  author: string;
  excerpt: string;
  emoji: string;
  color: string;
}

const writings: Writing[] = [
  { category: "poems", title: "The Quiet After", author: "Anonymous", excerpt: "In the stillness between breaths, I found a place where worry rests...", emoji: "🌿", color: "bg-[#e5f6e8]" },
  { category: "stories", title: "The Lighthouse Keeper", author: "Maya Lin", excerpt: "The silence had become a friend — the kind that sits beside you...", emoji: "🕯️", color: "bg-[#fff9db]" },
  { category: "reflections", title: "On Healing", author: "Rumi", excerpt: "The wound is the place where the Light enters you...", emoji: "✨", color: "bg-[#f3f0ff]" },
  { category: "art", title: "Inner Garden", author: "Yuki Tanaka", excerpt: "A human silhouette filled with blooming wildflowers...", emoji: "🌸", color: "bg-[#ffe5ec]" },
];

const ExploreTab = () => {
  const [active, setActive] = useState<Category>("all");
  const filtered = active === "all" ? writings : writings.filter((w) => w.category === active);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10 relative min-h-screen">
      <DynamicBackground />
      <div className="relative z-10 space-y-8">
        <div className="flex flex-col items-center gap-2">
           <div className="p-4 bg-brand-soft rounded-[2.5rem] shadow-sm text-6xl">✨</div>
           <h2 className="text-4xl font-display font-bold italic text-brand-text-dark text-center">Explore</h2>
           <p className="text-brand-text/70 font-medium px-6 text-center">Writings & art that heal the soul</p>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide px-2">
          {["all", "poems", "stories", "reflections", "art"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat as Category)}
              className={`px-6 py-3 rounded-full text-xs font-bold capitalize transition-all shadow-sm ${
                active === cat
                  ? "bg-brand-tan text-white scale-105"
                  : "bg-brand-soft text-brand-text-dark hover:bg-brand-tan/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filtered.map((w, i) => (
            <div
              key={i}
              className={`${w.color} rounded-[2.5rem] p-8 space-y-4 shadow-sm border border-brand-tan/5 animate-fade-in relative overflow-hidden group hover:scale-[1.02] transition-all cursor-pointer`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex justify-between items-start">
                 <div className="text-4xl group-hover:rotate-12 transition-transform duration-500">{w.emoji}</div>
                 <button className="p-2 rounded-full bg-white/50 hover:bg-white transition-colors">
                    <Heart size={16} className="text-brand-text/40" />
                 </button>
              </div>
              <div className="space-y-1">
                 <h3 className="text-2xl font-display font-extrabold text-brand-text-dark italic">{w.title}</h3>
                 <p className="text-brand-text/60 font-bold text-xs">by {w.author} · <span className="uppercase tracking-widest opacity-60">{w.category}</span></p>
              </div>
              <p className="text-brand-text/80 font-medium leading-relaxed line-clamp-2 italic">"{w.excerpt}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreTab;
