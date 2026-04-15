import { useState, useEffect } from "react";
import { MessageCircle, Heart, Share2, User as UserIcon, Shield, Send, MoreVertical, X, Globe } from "lucide-react";
import DynamicBackground from "@/components/DynamicBackground";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "sonner";

interface Post {
  id: string;
  authorName: string;
  text: string;
  likes: number;
  isLiked: boolean;
  time: string;
  isAnonymous: boolean;
}

const STORAGE_KEY = "lumora_circles_posts";

const CommunitiesTab = () => {
  const { t, userName } = useLanguage();
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);

  // Initialize and load from storage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setPosts(JSON.parse(saved));
    } else {
      // Default initial posts
      const defaults: Post[] = [
        { 
          id: "1", 
          authorName: "Zen Explorer", 
          text: "Just completed a 20-minute box breathing session. Feeling completely centered for the first time today. Gratitude to this community.", 
          likes: 24, 
          isLiked: false, 
          time: "2h ago", 
          isAnonymous: false 
        },
        { 
          id: "2", 
          authorName: "Anonymous Soul", 
          text: "To anyone struggling today: your presence matters more than your productivity. Breathe and be gentle with yourself.", 
          likes: 56, 
          isLiked: true, 
          time: "5h ago", 
          isAnonymous: true 
        }
      ];
      setPosts(defaults);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
    }
  }, []);

  const saveToStorage = (updatedPosts: Post[]) => {
    setPosts(updatedPosts);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
  };

  const handleCreatePost = () => {
    const trimmed = newPost.trim();
    if (!trimmed) return;

    const post: Post = {
      id: Date.now().toString(),
      authorName: isAnonymous ? "Anonymous Soul" : (userName || "User"),
      text: trimmed,
      likes: 0,
      isLiked: false,
      time: "Just now",
      isAnonymous: isAnonymous
    };

    const updated = [post, ...posts];
    saveToStorage(updated);
    setNewPost("");
    toast.success("Experience shared within the Circle");
  };

  const toggleLike = (id: string) => {
    const updated = posts.map(p => {
      if (p.id === id) {
        return {
          ...p,
          likes: p.isLiked ? p.likes - 1 : p.likes + 1,
          isLiked: !p.isLiked
        };
      }
      return p;
    });
    saveToStorage(updated);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-32 relative min-h-screen">
      <DynamicBackground />
      
      <div className="relative z-10 space-y-10 px-4">
        {/* Header Section */}
        <div className="flex flex-col items-center gap-3 pt-4">
           <div className="p-4 bg-brand-soft rounded-[2.5rem] shadow-sm text-brand-tan border border-brand-tan/10">
              <Globe size={40} className="animate-pulse-soft" />
           </div>
           <div className="text-center">
              <h1 className="text-4xl font-display font-bold italic text-brand-text-dark">{t('circles')}</h1>
              <p className="text-brand-text/40 font-black uppercase tracking-[0.3em] text-[10px] mt-1">Universal Resonance</p>
           </div>
        </div>

        {/* Posting Interface */}
        <div className="p-8 rounded-[3.5rem] bg-white border border-brand-tan/10 shadow-2xl space-y-6">
           <div className="flex items-center gap-3 ml-2">
              <div className="w-10 h-10 rounded-2xl bg-brand-tan/10 flex items-center justify-center text-brand-tan">
                 {isAnonymous ? <Shield size={18} /> : <UserIcon size={18} />}
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-text-dark/40">
                {isAnonymous ? "Posting Anonymously" : `Sharing as ${userName}`}
              </p>
           </div>

           <textarea
             value={newPost}
             onChange={(e) => setNewPost(e.target.value.slice(0, 500))}
             placeholder="What wisdom would you like to share today?"
             className="w-full bg-brand-soft/50 rounded-[2.5rem] p-8 text-lg font-medium italic text-brand-text-dark placeholder:text-brand-text/20 resize-none focus:outline-none focus:ring-4 focus:ring-brand-tan/5 min-h-[160px] transition-all border-none leading-relaxed"
           />

           <div className="flex items-center gap-3">
              {/* Share Now Button - Now the only action */}
              <button 
                onClick={handleCreatePost}
                disabled={!newPost.trim()}
                className="w-full h-14 rounded-full bg-brand-tan text-white font-black text-[10px] uppercase tracking-[0.2em] shadow-lg hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-30 disabled:pointer-events-none"
              >
                SHARE NOW
              </button>
           </div>
        </div>

        {/* Feed Section */}
        <div className="space-y-6">
           {posts.length === 0 ? (
             <div className="py-20 flex flex-col items-center gap-4 animate-pulse">
                <div className="w-12 h-12 bg-brand-tan/10 rounded-full" />
                <p className="text-[9px] font-black uppercase tracking-widest text-brand-text/20">Awaiting resonance...</p>
             </div>
           ) : (
             posts.map((post, i) => (
               <article 
                 key={post.id}
                 className="p-8 rounded-[3rem] bg-white/80 backdrop-blur-md border border-brand-tan/5 shadow-sm hover:shadow-lg transition-all animate-in fade-in zoom-in-95"
                 style={{ animationDelay: `${i * 0.1}s` }}
               >
                 <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                       <div className={`w-12 h-12 rounded-3xl flex items-center justify-center shadow-inner ${post.isAnonymous ? "bg-slate-100 text-slate-400" : "bg-brand-tan/10 text-brand-tan"}`}>
                          {post.isAnonymous ? <Shield size={20} /> : <UserIcon size={20} />}
                       </div>
                       <div>
                          <p className="text-sm font-bold text-brand-text-dark">{post.authorName}</p>
                          <p className="text-[9px] font-black text-brand-text/30 uppercase tracking-[0.2em]">{post.time}</p>
                       </div>
                    </div>
                    <button className="p-2 text-brand-text/20 hover:text-brand-tan">
                       <MoreVertical size={20} />
                    </button>
                 </div>

                 <p className="text-xl md:text-2xl font-display font-bold italic text-brand-text-dark leading-relaxed mb-8 pr-2">
                   "{post.text}"
                 </p>

                 <div className="flex items-center gap-8 pt-6 border-t border-brand-tan/5">
                    <button 
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${
                        post.isLiked ? "text-red-500 scale-105" : "text-brand-text/30 hover:text-brand-tan"
                      }`}
                    >
                       <Heart size={18} fill={post.isLiked ? "currentColor" : "none"} />
                       {post.likes}
                    </button>
                    
                    <button 
                      onClick={() => toast.success("Opening conversation...")}
                      className="text-[10px] font-black uppercase tracking-widest text-brand-text/30 hover:text-brand-tan flex items-center gap-2 transition-all"
                    >
                       <MessageCircle size={18} />
                       Resonate
                    </button>

                    <button 
                      onClick={() => toast.success("Post link copied!")}
                      className="text-[10px] font-black uppercase tracking-widest text-brand-text/30 hover:text-brand-tan flex items-center gap-2 transition-all ml-auto"
                    >
                       <Share2 size={18} />
                    </button>
                 </div>
               </article>
             ))
           )}
        </div>
      </div>
    </div>
  );
};

export default CommunitiesTab;
