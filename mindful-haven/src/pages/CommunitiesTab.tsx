import { useState, useEffect } from "react";
import { Users, MessageCircle, Heart, Shield, Flower2, Sun, Send, ThumbsUp, Activity, User as UserIcon } from "lucide-react";
import DynamicBackground from "@/components/DynamicBackground";
import { useLanguage } from "@/context/LanguageContext";
import { apiRequest } from "@/lib/api-client";
import { toast } from "sonner";

interface SharedExperience {
  _id: string;
  authorName: string;
  text: string;
  group: string;
  likes: number;
  likedBy: string[];
  time: string;
}

const CommunitiesTab = () => {
  const { t, userName } = useLanguage();
  const [posts, setPosts] = useState<SharedExperience[]>([]);
  const [loading, setLoading] = useState(true);

  const groups = [
    { icon: Activity, titleKey: "group_1" },
    { icon: Shield, titleKey: "group_2" },
    { icon: Flower2, titleKey: "group_3" },
    { icon: Sun, titleKey: "group_4" },
    { icon: Users, titleKey: "group_5" },
    { icon: MessageCircle, titleKey: "group_6" },
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await apiRequest("/posts");
        setPosts(data);
      } catch (err) {
        toast.error("Cloud connection failed. Using local resonance.");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const [newPost, setNewPost] = useState("");
  const [selectedGroupKey, setSelectedGroupKey] = useState("group_1");
  const [anonymous, setAnonymous] = useState(true);

  const handleSubmit = async () => {
    const trimmed = newPost.trim();
    if (!trimmed || trimmed.length > 500) return;

    try {
      const post = await apiRequest("/posts", {
        method: "POST",
        body: JSON.stringify({
          text: trimmed,
          group: selectedGroupKey,
          isAnonymous: anonymous
        })
      });
      setPosts([post, ...posts]);
      setNewPost("");
      toast.success("Experience shared with the sanctuary");
    } catch (err: any) {
      toast.error(err.message || "Failed to share experience");
    }
  };

  const toggleLike = async (id: string) => {
     try {
       const updatedPost = await apiRequest(`/posts/${id}/like`, { method: "POST" });
       setPosts(posts.map((p) => (p._id === id ? updatedPost : p)));
     } catch (err: any) {
       toast.error("Could not reach global resonance");
     }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10 relative min-h-screen">
      <DynamicBackground />
      <div className="relative z-10 space-y-8">
        <div className="flex flex-col items-center gap-2">
           <div className="p-4 bg-brand-soft rounded-[2.5rem] shadow-sm text-brand-tan">
              <MessageCircle size={48} strokeWidth={1.5} />
           </div>
           <h2 className="text-4xl font-display font-bold italic text-brand-text-dark text-center">{t('circles')}</h2>
           <p className="text-brand-text/40 font-black uppercase tracking-[0.2em] text-[10px]">{t('circles_desc')}</p>
        </div>

        {/* Group chips */}
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide px-2">
          {groups.map((g) => {
            const Icon = g.icon;
            return (
              <button
                key={g.titleKey}
                onClick={() => setSelectedGroupKey(g.titleKey)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all shadow-sm ${
                  selectedGroupKey === g.titleKey
                    ? "bg-brand-tan text-white scale-105"
                    : "bg-brand-soft text-brand-text-dark hover:bg-brand-tan/10"
                }`}
              >
                <Icon size={12} strokeWidth={2.5} />
                {t(g.titleKey)}
              </button>
            );
          })}
        </div>

        {/* Share experience */}
        <div className="p-8 rounded-[2.5rem] bg-brand-soft border border-brand-tan/10 shadow-sm animate-fade-in relative overflow-hidden group">
          <p className="text-xs font-black text-brand-text-dark mb-4 uppercase tracking-[0.2em] opacity-40 px-1">{t('share_exp')}</p>
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value.slice(0, 500))}
            placeholder={anonymous ? t('sharing_anon') : `${t('sharing_as')} ${userName}...`}
            className="w-full bg-white/50 backdrop-blur-sm rounded-3xl p-6 text-sm text-brand-text-dark placeholder:text-brand-text/30 resize-none focus:outline-none focus:ring-2 focus:ring-brand-tan/10 min-h-[140px] transition-all border-none font-medium leading-relaxed"
            rows={3}
          />
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={() => setAnonymous(!anonymous)}
              className={`text-[10px] px-6 py-2.5 rounded-full font-black uppercase tracking-widest transition-all shadow-sm flex items-center gap-2 ${
                anonymous ? "bg-brand-tan text-white" : "bg-white text-brand-text-dark"
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${anonymous ? 'bg-white' : 'bg-brand-tan'} animate-pulse`} />
              {anonymous ? t('post_anon') : `${t('post_as_user')} ${userName}`}
            </button>
            <button
              onClick={handleSubmit}
              disabled={!newPost.trim()}
              className="flex items-center gap-2 px-10 py-3 rounded-full bg-brand-tan text-white text-xs font-black uppercase tracking-[0.2em] disabled:opacity-30 transition-all hover:scale-105 active:scale-95 shadow-lg"
            >
              {t('share_now')}
            </button>
          </div>
        </div>

        {/* Posts feed */}
        <div className="space-y-6">
          {loading ? (
            <div className="flex flex-col items-center py-12 gap-4 animate-pulse">
               <div className="w-12 h-12 bg-brand-tan/20 rounded-full" />
               <p className="text-[10px] font-black uppercase tracking-widest text-brand-text/30">Syncing Sanctuary Resonance...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="flex flex-col items-center py-12 gap-4 text-center">
               <div className="p-4 bg-brand-soft rounded-full text-brand-tan/40">
                  <Heart size={32} />
               </div>
               <p className="text-sm font-medium text-brand-text-dark/40 max-w-[200px]">The sanctuary is quiet. Be the first to share your light.</p>
            </div>
          ) : (
            posts.map((post, i) => {
              const liked = post.likedBy?.includes(userName) || false; // Mocking current user check for now
              return (
                <div
                  key={post._id}
                  className="p-8 rounded-[2.5rem] bg-white/80 backdrop-blur-sm border border-brand-tan/5 shadow-sm animate-fade-in hover:shadow-md transition-all"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-brand-tan/10 flex items-center justify-center text-brand-tan shadow-inner">
                        <UserIcon size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-brand-text-dark">{post.authorName}</p>
                        <p className="text-[10px] font-black text-brand-text/30 uppercase tracking-[0.2em]">{t(post.group)}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-lg text-brand-text-dark leading-relaxed mb-6 italic font-medium pr-4">" {post.text} "</p>
                  <div className="flex items-center gap-8">
                    <button
                      onClick={() => toggleLike(post._id)}
                      className={`flex items-center gap-2 text-[10px] transition-all font-black uppercase tracking-[0.2em] ${
                        liked ? "text-brand-tan scale-110" : "text-brand-text/30 hover:text-brand-tan"
                      }`}
                    >
                      <ThumbsUp size={16} fill={liked ? "currentColor" : "none"} />
                      {post.likes}
                    </button>
                    <button className="text-[10px] text-brand-text/30 hover:text-brand-tan font-black uppercase tracking-[0.2em] flex items-center gap-2">
                      <MessageCircle size={16} />
                      {t('reply')}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunitiesTab;
