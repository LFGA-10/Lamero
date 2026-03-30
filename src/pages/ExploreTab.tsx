import { BookOpen, Feather, PenLine, Palette, Music, Quote, Image, X } from "lucide-react";
import { useState } from "react";
import DynamicBackground from "@/components/DynamicBackground";
import artHealingHands from "@/assets/art-healing-hands.jpg";
import artWeightWeCarry from "@/assets/art-weight-we-carry.jpg";
import artInnerGarden from "@/assets/art-inner-garden.jpg";
import artBreakingThrough from "@/assets/art-breaking-through.jpg";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type Category = "all" | "poems" | "stories" | "reflections" | "art";

interface Writing {
  category: Category;
  icon: typeof Feather;
  title: string;
  author: string;
  excerpt: string;
  image?: string;
}

const writings: Writing[] = [
  { category: "poems", icon: Feather, title: "The Quiet After", author: "Anonymous", excerpt: "In the stillness between breaths,\nI found a place where worry rests.\nNot gone — just sleeping, soft and slow,\nA garden where calm flowers grow." },
  { category: "stories", icon: BookOpen, title: "The Lighthouse Keeper", author: "Maya Lin", excerpt: "She hadn't spoken to anyone in three weeks. Not out of sadness, but because the silence had become a friend — the kind that sits beside you without needing to fill the space..." },
  { category: "poems", icon: Feather, title: "Unraveling", author: "J. Rivers", excerpt: "I am not broken,\njust bent toward the light.\nEvery crack, a window;\nevery scar, a story\nwhispered to the night." },
  { category: "reflections", icon: PenLine, title: "Letter to My Younger Self", author: "Community Member", excerpt: "You will learn that strength is not the absence of tears but the courage to let them fall. The walls you're building now — you'll tear them down one day, and it will be the bravest thing you ever do." },
  { category: "art", icon: Image, title: "Healing Hands", author: "Elena Torres", excerpt: "Two hands releasing a flock of golden birds into a twilight sky — symbolizing letting go of pain and embracing freedom.", image: artHealingHands },
  { category: "stories", icon: BookOpen, title: "The Empty Chair", author: "Dr. Sarah Cole", excerpt: "Every Tuesday at 3pm, the old man brought two cups of tea to the park bench. One for himself, one for the empty chair beside him. 'Grief doesn't mean forgetting,' he told me once..." },
  { category: "reflections", icon: Quote, title: "On Healing", author: "Rumi (adapted)", excerpt: "The wound is the place where the Light enters you. Don't turn away. Keep your gaze on the bandaged place. That's where the light enters you." },
  { category: "art", icon: Palette, title: "The Weight We Carry", author: "Marcus Hale", excerpt: "A figure walking uphill, their shadow shaped like heavy chains — yet flowers bloom from each footprint left behind.", image: artWeightWeCarry },
  { category: "poems", icon: Feather, title: "Small Victories", author: "K. Patel", excerpt: "Today I opened the curtains.\nTomorrow, maybe the window.\nThe day after — who knows?\nPerhaps the door." },
  { category: "art", icon: Image, title: "Inner Garden", author: "Yuki Tanaka", excerpt: "A human silhouette filled with blooming wildflowers, roots intertwining with veins — representing growth from within.", image: artInnerGarden },
  { category: "reflections", icon: Palette, title: "Art as Medicine", author: "Community Member", excerpt: "I couldn't say it in words, so I painted it — dark blues that slowly bled into gold at the edges. My therapist said, 'That's what hope looks like.'" },
  { category: "art", icon: Palette, title: "Breaking Through", author: "Amara Osei", excerpt: "A face half-covered by cracking porcelain — underneath, warm light glows through the fractures, suggesting beauty in imperfection.", image: artBreakingThrough },
];

const categories: { id: Category; label: string }[] = [
  { id: "all", label: "All" },
  { id: "poems", label: "Poems" },
  { id: "stories", label: "Stories" },
  { id: "reflections", label: "Reflections" },
  { id: "art", label: "Paintings & Drawings" },
];

const ExploreTab = () => {
  const [active, setActive] = useState<Category>("all");
  const [selectedWriting, setSelectedWriting] = useState<Writing | null>(null);
  const filtered = active === "all" ? writings : writings.filter((w) => w.category === active);

  return (
    <div className="relative min-h-screen pb-24">
      <DynamicBackground />
      <div className="relative z-10 px-5 pt-14 max-w-lg mx-auto">
        <h1 className="font-display text-2xl font-bold text-primary-foreground mb-1">Explore</h1>
        <p className="text-primary-foreground/70 text-sm mb-4">Writings & art that heal the soul</p>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                active === cat.id
                  ? "bg-brown text-brown-foreground"
                  : "bg-brown/30 text-primary-foreground/80 hover:bg-brown/50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filtered.map((w, i) => {
            const Icon = w.icon;
            const isArt = w.category === "art" && w.image;

            return (
              <div
                key={i}
                onClick={() => setSelectedWriting(w)}
                className="rounded-2xl bg-brown border border-brown/20 hover:shadow-md transition-all cursor-pointer animate-fade-in overflow-hidden active:scale-[0.98]"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {isArt && (
                  <img src={w.image} alt={w.title} loading="lazy" width={768} height={512} className="w-full h-52 object-cover" />
                )}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon size={16} className="text-brown-foreground/80" />
                    <span className="text-[10px] uppercase tracking-wider font-medium text-brown-foreground/60">{w.category}</span>
                  </div>
                  <h3 className="font-display font-semibold text-brown-foreground text-base mb-1">{w.title}</h3>
                  <p className="text-brown-foreground/70 text-xs mb-2 italic">by {w.author}</p>
                  {!isArt && <p className="text-brown-foreground/90 text-sm leading-relaxed whitespace-pre-line">{w.excerpt}</p>}
                  {isArt && <p className="text-brown-foreground/70 text-xs">{w.excerpt}</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selectedWriting} onOpenChange={(o) => !o && setSelectedWriting(null)}>
        <DialogContent className="bg-brown border-brown/20 text-brown-foreground max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-brown-foreground">{selectedWriting?.title}</DialogTitle>
            <DialogDescription className="text-brown-foreground/70 italic">
              by {selectedWriting?.author} · {selectedWriting?.category}
            </DialogDescription>
          </DialogHeader>
          {selectedWriting?.image && (
            <img src={selectedWriting.image} alt={selectedWriting.title} className="w-full rounded-xl object-cover max-h-64" />
          )}
          <p className="text-sm text-brown-foreground/90 leading-relaxed whitespace-pre-line">
            {selectedWriting?.excerpt}
          </p>
          <button className="w-full py-2.5 rounded-xl bg-brown-foreground/20 text-brown-foreground text-sm font-medium hover:bg-brown-foreground/30 transition-colors mt-2">
            ♡ Save to Favorites
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExploreTab;
