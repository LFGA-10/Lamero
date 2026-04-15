import { useState } from "react";
import DynamicBackground from "@/components/DynamicBackground";
import { Sparkles, Heart, Feather, BookOpen, Quote, Image as ImageIcon, X, MapPin, Calendar, User } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

type Category = "all" | "drawings" | "paintings" | "poems" | "stories";

interface Writing {
  id: number;
  category: Category;
  title: string;
  author: string;
  excerpt: string;
  fullExplanation: string;
  emoji: string;
  color: string;
  imageUrl?: string;
}

const writings: Writing[] = [
  { 
    id: 1,
    category: "drawings", 
    title: "Eternal Calm", 
    author: "L. Valery", 
    excerpt: "A charcoal study of a quiet lake at dawn.", 
    fullExplanation: "This piece explores the transition from darkness to light. The charcoal texture represents the ruggedness of the mind, while the light reflecting off the lake symbolizes the emergence of clarity after a long meditation. It took the artist 40 days of silence to capture this exact energy.",
    emoji: "✏️", 
    color: "bg-slate-100", 
    imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800" 
  },
  { 
    id: 2,
    category: "paintings", 
    title: "Sunset Mind", 
    author: "Sarah J.", 
    excerpt: "Oil on canvas exploring the warmth of a peaceful mind.", 
    fullExplanation: "Sarah J. uses deep oranges and soft purples to represent the 'cooling down' of the ego. Just as the sun sets to allow the stars to shine, this painting suggests that we must let go of our daily strivings to find our inner glow. The layered oil technique adds a physical weight to the concept of peace.",
    emoji: "🎨", 
    color: "bg-orange-50", 
    imageUrl: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=800" 
  },
  { 
    id: 3,
    category: "paintings", 
    title: "Waves of Peace", 
    author: "Ocean Soul", 
    excerpt: "Abstract blues and whites capturing the rhythm of breath.", 
    fullExplanation: "These abstract waves represent the rhythmic nature of human existence. The artist was inspired by the 4-4-4-4 box breathing technique, creating a piece that flows with a mathematical yet biological precision. Each white crest is a point of oxygenation, while the deep blues represent the carbon release.",
    emoji: "🌊", 
    color: "bg-blue-50", 
    imageUrl: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=800" 
  },
  { 
    id: 4,
    category: "drawings", 
    title: "The Roots Within", 
    author: "Rooted One", 
    excerpt: "Intricate ink drawing of a tree reflecting human nervous system.", 
    fullExplanation: "A technical masterpiece that maps the bronchial tree of a lung onto the root system of an ancient oak. It serves as a reminder that our breath is our root; without the air that surrounds us, our internal growth becomes impossible. The ink lines are as thin as human hair to show the fragility of life.",
    emoji: "🌳", 
    color: "bg-brand-soft", 
    imageUrl: "https://images.unsplash.com/photo-1534349762230-e0cadf78f5db?auto=format&fit=crop&q=80&w=800" 
  },
];

const ExploreTab = () => {
  const [active, setActive] = useState<Category>("all");
  const [likedIds, setLikedIds] = useState<number[]>([]);
  const [selectedItem, setSelectedItem] = useState<Writing | null>(null);
  
  const filtered = active === "all" ? writings : writings.filter((w) => w.category === active);

  const toggleLike = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setLikedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    if (!likedIds.includes(id)) toast.success("Added to your favorites");
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-32 relative min-h-screen">
      <DynamicBackground />
      <div className="relative z-10 space-y-8">
        <div className="flex flex-col items-center gap-2">
           <div className="p-4 bg-brand-soft rounded-[2.5rem] shadow-sm text-6xl">✨</div>
           <h2 className="text-4xl font-display font-bold italic text-brand-text-dark text-center">Explore</h2>
           <p className="text-brand-text/70 font-medium px-6 text-center italic">Discover writings & art that heal the soul</p>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar px-4">
          {["all", "drawings", "paintings", "poems", "stories"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat as Category)}
              className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-sm shrink-0 border border-brand-tan/10 ${
                active === cat
                  ? "bg-brand-tan text-white scale-105 shadow-brand-tan/20"
                  : "bg-card/80 backdrop-blur-sm text-brand-text-dark dark:text-brand-soft/80 hover:bg-brand-tan/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-6 px-4">
          {filtered.map((w, i) => (
            <div
              key={w.id}
              onClick={() => setSelectedItem(w)}
              className={`${w.color} rounded-[3rem] overflow-hidden shadow-sm border border-brand-tan/5 animate-in fade-in zoom-in-95 relative group hover:scale-[1.01] transition-all cursor-pointer`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {w.imageUrl && (
                <div className="h-56 w-full overflow-hidden relative">
                   <img src={w.imageUrl} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={w.title} />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                   <div className="absolute top-6 left-6 flex gap-2">
                      <span className="text-[8px] font-black tracking-widest bg-white/20 backdrop-blur-md text-white px-3 py-1.5 rounded-full border border-white/20 uppercase">{w.category}</span>
                   </div>
                </div>
              )}
              <div className="p-8 space-y-4">
                <div className="flex justify-between items-start">
                   <div className="text-4xl group-hover:rotate-12 transition-transform duration-500">{w.emoji}</div>
                    <button 
                      onClick={(e) => toggleLike(e, w.id)}
                      className={`p-4 rounded-2xl transition-all shadow-sm relative overflow-hidden ${
                        likedIds.includes(w.id) ? "bg-red-500 text-white" : "bg-card/80 backdrop-blur-sm hover:bg-card text-brand-text/20"
                      }`}
                    >
                      <Heart size={20} fill={likedIds.includes(w.id) ? "currentColor" : "none"} />
                   </button>
                </div>
                 <div className="space-y-1">
                    <h3 className="text-2xl font-display font-extrabold text-brand-text-dark dark:text-brand-soft italic leading-tight">{w.title}</h3>
                    <p className="text-brand-text/40 font-black text-[10px] uppercase tracking-[0.2em]">{w.author}</p>
                 </div>
                 <p className="text-brand-text/70 dark:text-brand-soft/70 font-medium leading-relaxed italic text-sm line-clamp-2">" {w.excerpt} "</p>
                
                <div className="flex items-center gap-2 text-[10px] font-black text-brand-tan uppercase tracking-widest pt-2">
                   View Details <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DialogContent className="sm:max-w-2xl rounded-[3.5rem] border-none glass-strong shadow-2xl p-0 overflow-hidden animate-in zoom-in-95 duration-500">
          {selectedItem && (
            <div className="flex flex-col h-full max-h-[90vh] overflow-y-auto no-scrollbar">
                <div className="relative h-[400px] w-full shrink-0">
                   <img src={selectedItem.imageUrl} className="w-full h-full object-cover" alt={selectedItem.title} />
                   <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent" />
                   <button 
                     onClick={() => setSelectedItem(null)}
                     className="absolute top-6 right-6 p-3 bg-background/20 backdrop-blur-md text-white rounded-2xl hover:bg-background/40 transition-all border border-white/20"
                   >
                    <X size={24} />
                  </button>
                  <div className="absolute bottom-8 left-10">
                    <span className="text-[10px] font-black tracking-[0.3em] bg-brand-tan text-white px-5 py-2 rounded-full uppercase shadow-lg">
                      {selectedItem.category}
                    </span>
                  </div>
               </div>

               <div className="p-10 pt-4 space-y-8">
                  <div className="space-y-3">
                     <h2 className="text-5xl font-display font-black italic text-brand-text-dark tracking-tight leading-none">
                       {selectedItem.title}
                     </h2>
                     <div className="flex items-center gap-4 text-brand-text/40">
                        <div className="flex items-center gap-1.5">
                           <User size={14} className="text-brand-tan" />
                           <span className="text-[10px] font-black uppercase tracking-widest">{selectedItem.author}</span>
                        </div>
                        <div className="w-1 h-1 bg-brand-tan/20 rounded-full" />
                        <div className="flex items-center gap-1.5">
                           <Calendar size={14} className="text-brand-tan" />
                           <span className="text-[10px] font-black uppercase tracking-widest">Released April 2024</span>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-6">
                     <div className="p-8 bg-brand-soft rounded-[2.5rem] border border-brand-tan/10 relative overflow-hidden group">
                        <Quote size={40} className="absolute -top-4 -left-4 text-brand-tan/10 transform -rotate-12 transition-transform group-hover:rotate-0" />
                        <p className="relative text-xl font-display font-bold italic text-brand-text-dark leading-relaxed">
                          "{selectedItem.excerpt}"
                        </p>
                     </div>

                     <div className="space-y-4">
                        <h4 className="text-[10px] font-black text-brand-text/30 uppercase tracking-[0.4em] ml-2">Deep Insights</h4>
                        <p className="text-brand-text/70 font-medium leading-loose italic text-lg whitespace-pre-line">
                          {selectedItem.fullExplanation}
                        </p>
                     </div>
                  </div>

                  <div className="pt-6 border-t border-brand-tan/5 grid grid-cols-2 gap-4">
                     <button 
                       onClick={(e) => toggleLike(e, selectedItem.id)}
                       className={`flex items-center justify-center gap-3 py-5 rounded-[2rem] transition-all font-black text-[10px] uppercase tracking-widest shadow-sm ${
                         likedIds.includes(selectedItem.id) 
                         ? "bg-red-500 text-white" 
                         : "bg-brand-soft text-brand-text-dark hover:bg-brand-tan/10"
                       }`}
                     >
                        <Heart size={18} fill={likedIds.includes(selectedItem.id) ? "currentColor" : "none"} />
                        {likedIds.includes(selectedItem.id) ? "Favorited" : "Favorite"}
                     </button>
                     <button 
                       onClick={() => toast.success("Opening artist profile...")}
                       className="flex items-center justify-center gap-3 py-5 rounded-[2rem] bg-brand-tan text-white font-black text-[10px] uppercase tracking-widest shadow-lg shadow-brand-tan/20 hover:scale-[1.02] transition-all"
                     >
                        <ImageIcon size={18} />
                        View Artist
                     </button>
                  </div>
               </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExploreTab;

const ChevronRight = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m9 18 6-6-6-6"/>
  </svg>
);
