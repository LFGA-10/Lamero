import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Heart, Share2, Sparkles, MessageCircle, Bookmark, Copy, Link as LinkIcon, Instagram, Twitter, Send, Check } from "lucide-react";
import { toast } from "sonner";
import DynamicBackground from "@/components/DynamicBackground";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface PinterestQuote {
  id: number;
  textKey: string;
  author: string;
  img: string;
  height: string;
}

const quotes: PinterestQuote[] = [
  { id: 1, textKey: "quote_1", author: "Marcus Aurelius", img: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=400", height: "h-64" },
  { id: 2, textKey: "quote_2", author: "Buddha", img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=400", height: "h-80" },
  { id: 3, textKey: "quote_3", author: "Thich Nhat Hanh", img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=400", height: "h-72" },
  { id: 4, textKey: "quote_4", author: "Ma Jaya Sati", img: "https://images.unsplash.com/photo-1500624239109-db1957703270?auto=format&fit=crop&q=80&w=400", height: "h-64" },
  { id: 5, textKey: "quote_5", author: "Lao Tzu", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=400", height: "h-96" },
  { id: 6, textKey: "quote_6", author: "Lao Tzu", img: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=400", height: "h-72" },
  { id: 7, textKey: "quote_7", author: "Steve Jobs", img: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=400", height: "h-64" },
  { id: 8, textKey: "quote_8", author: "Eleanor Roosevelt", img: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&q=80&w=400", height: "h-80" },
  { id: 9, textKey: "quote_9", author: "Albert Einstein", img: "https://images.unsplash.com/photo-1518173946687-a4c8a98039f5?auto=format&fit=crop&q=80&w=400", height: "h-72" },
  { id: 10, textKey: "quote_10", author: "Winston Churchill", img: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&q=80&w=400", height: "h-96" },
];

const HomeTab = () => {
  const { t } = useLanguage();
  const [likedIds, setLikedIds] = useState<number[]>([]);
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<PinterestQuote | null>(null);
  const [copied, setCopied] = useState(false);

  const toggleLike = (id: number) => {
    setLikedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    if (!likedIds.includes(id)) toast.success("Quote liked!");
  };

  const toggleSave = (id: number) => {
    setSavedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    toast.success(savedIds.includes(id) ? "Removed from sanctuary" : "Added to your sanctuary");
  };

  const openShare = (quote: PinterestQuote) => {
    setSelectedQuote(quote);
    setIsShareModalOpen(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const shareInternal = () => {
    toast.success("Shared with Circles community!");
    setIsShareModalOpen(false);
  };

  const shareSocial = (platform: string) => {
    toast.success(`Opening ${platform}...`);
    setIsShareModalOpen(false);
  };

  const savedQuotes = quotes.filter(q => savedIds.includes(q.id));

  return (
    <div className="pb-24 pt-4 animate-in fade-in duration-700 relative">
      <DynamicBackground />
      
      <div className="relative z-10">
        <div className="flex flex-col items-center gap-2 mb-8 text-center px-4">
          <div className="p-3 bg-brand-soft rounded-3xl text-brand-tan shadow-sm border border-brand-tan/10 mb-2">
            <Sparkles size={28} />
          </div>
          <h1 className="text-3xl font-display font-black italic text-brand-text-dark tracking-tight uppercase leading-none">
            {t('home')}
          </h1>
          <p className="text-[10px] font-black text-brand-text/30 uppercase tracking-[0.3em]">
            Your sanctuary of daily wisdom
          </p>
        </div>

        {/* Saved Section Slider */}
        {savedQuotes.length > 0 && (
          <div className="mb-10 animate-in slide-in-from-right-4 duration-700">
            <div className="flex items-center justify-between px-6 mb-4">
              <h2 className="text-xl font-display font-bold italic text-brand-text-dark">Saved Sanctuary</h2>
              <span className="text-[9px] font-black text-brand-tan uppercase tracking-widest bg-brand-tan/10 px-3 py-1 rounded-full">
                {savedQuotes.length} Quotes
              </span>
            </div>
            
            <div className="flex gap-4 overflow-x-auto pb-6 px-6 no-scrollbar">
               {savedQuotes.map((quote) => (
                 <div key={quote.id} className="min-w-[160px] h-[220px] relative rounded-[2.5rem] overflow-hidden shadow-lg border-2 border-brand-soft group shrink-0">
                    <img src={quote.img} className="absolute inset-0 w-full h-full object-cover" alt="Saved" />
                    <div className="absolute inset-0 p-5 flex flex-col justify-end gap-2 bg-gradient-to-t from-black/60 to-transparent">
                       <p className="text-white text-[10px] font-medium italic line-clamp-3 leading-tight">"{t(quote.textKey)}"</p>
                       <p className="text-white/50 text-[7px] font-black uppercase tracking-widest shrink-0">— {quote.author}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        )}

        {/* Main Masonry Grid */}
        <div className="columns-2 gap-4 space-y-4 px-4">
          {quotes.map((quote) => {
            const isLiked = likedIds.includes(quote.id);
            const isSaved = savedIds.includes(quote.id);
            
            return (
              <div 
                key={quote.id} 
                className="relative break-inside-avoid mb-4 group rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 bg-white/5 backdrop-blur-sm"
              >
                <img 
                  src={quote.img} 
                  alt={quote.author} 
                  className={`w-full ${quote.height} object-cover transition-transform duration-700 group-hover:scale-110`} 
                />
                
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/80 flex flex-col justify-end p-6">
                  <div className="space-y-4">
                    <p className="text-white text-lg font-display font-extrabold italic leading-tight drop-shadow-lg">
                      "{t(quote.textKey)}"
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-[8px] font-black uppercase tracking-widest">— {quote.author}</span>
                      <div className="flex gap-2">
                        <button 
                          onClick={(e) => { e.stopPropagation(); toggleLike(quote.id); }}
                          className={`p-2 backdrop-blur-md rounded-full transition-all active:scale-90 ${isLiked ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/40'}`}
                        >
                          <Heart size={14} fill={isLiked ? "currentColor" : "none"} />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); openShare(quote); }}
                          className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all active:scale-90"
                        >
                          <Share2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Save Ribbon */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleSave(quote.id); }}
                    className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all shadow-lg ${isSaved ? 'bg-brand-tan text-white' : 'bg-white text-brand-tan hover:scale-105'}`}
                  >
                    {isSaved ? 'Saved' : 'Save'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Share Modal */}
      <Dialog open={isShareModalOpen} onOpenChange={setIsShareModalOpen}>
        <DialogContent className="sm:max-w-md rounded-[3rem] border-none glass-strong shadow-2xl p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display font-bold italic text-brand-text-dark text-center mb-4">Spread the Wisdom</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-8">
            {/* Direct Link Section */}
            <div className="space-y-3">
               <p className="text-[9px] font-black text-brand-text/30 uppercase tracking-[0.2em] ml-2">Quick Link</p>
               <div className="flex items-center gap-2 p-4 bg-brand-soft rounded-3xl border border-brand-tan/10">
                 <LinkIcon size={18} className="text-brand-tan shrink-0" />
                 <input 
                   readOnly 
                   value={`https://lumora.app/insight/${selectedQuote?.id}`}
                   className="flex-1 bg-transparent text-[11px] font-medium text-brand-text-dark outline-none truncate"
                 />
                 <button 
                   onClick={() => copyToClipboard(`https://lumora.app/insight/${selectedQuote?.id}`)}
                   className="p-2 hover:bg-brand-tan/10 rounded-xl transition-all text-brand-tan"
                 >
                   {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                 </button>
               </div>
            </div>

            {/* Internal Circles */}
            <div className="space-y-3">
               <p className="text-[9px] font-black text-brand-text/30 uppercase tracking-[0.2em] ml-2">App Community</p>
               <button 
                 onClick={shareInternal}
                 className="w-full flex items-center justify-between p-5 bg-white rounded-[2rem] border border-brand-tan/5 shadow-sm hover:shadow-md transition-all group"
               >
                 <div className="flex items-center gap-4">
                    <div className="p-3 bg-brand-tan/10 rounded-2xl text-brand-tan group-hover:bg-brand-tan transition-all">
                       <MessageCircle size={20} className="group-hover:text-white" />
                    </div>
                    <span className="font-bold text-sm text-brand-text-dark">Share with Circles</span>
                 </div>
                 <Send size={16} className="text-brand-text/20 group-hover:translate-x-1 transition-all" />
               </button>
            </div>

            {/* External Apps */}
            <div className="space-y-4">
               <p className="text-[9px] font-black text-brand-text/30 uppercase tracking-[0.2em] ml-2">Social Channels</p>
               <div className="grid grid-cols-3 gap-4">
                  {[
                    { name: 'WhatsApp', icon: MessageCircle, color: 'text-green-500', bg: 'bg-green-50' },
                    { name: 'Instagram', icon: Instagram, color: 'text-pink-500', bg: 'bg-pink-50' },
                    { name: 'Twitter', icon: Twitter, color: 'text-blue-500', bg: 'bg-blue-50' },
                  ].map((app) => (
                    <button 
                      key={app.name}
                      onClick={() => shareSocial(app.name)}
                      className="flex flex-col items-center gap-3 p-5 rounded-[2rem] bg-white border border-brand-tan/5 hover:bg-brand-soft transition-all group"
                    >
                      <div className={`p-4 ${app.bg} ${app.color} rounded-2xl group-hover:scale-110 transition-transform shadow-sm`}>
                        <app.icon size={24} />
                      </div>
                      <span className="text-[8px] font-black uppercase tracking-widest text-brand-text-dark/40">{app.name}</span>
                    </button>
                  ))}
               </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HomeTab;
