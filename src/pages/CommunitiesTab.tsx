import { useState } from "react";
import { Users, MessageCircle, Heart, Shield, Flower2, Sun, Send, ThumbsUp } from "lucide-react";
import DynamicBackground from "@/components/DynamicBackground";

interface SharedExperience {
  id: number;
  author: string;
  text: string;
  group: string;
  likes: number;
  liked: boolean;
  time: string;
}

const groups = [
  { icon: Heart, title: "Anxiety Support" },
  { icon: Shield, title: "PTSD Warriors" },
  { icon: Flower2, title: "Depression Recovery" },
  { icon: Sun, title: "Mindfulness Circle" },
  { icon: Users, title: "Grief & Loss" },
  { icon: MessageCircle, title: "Teen Mental Health" },
];

const initialPosts: SharedExperience[] = [
  { id: 1, author: "Anonymous Lily", text: "Today I managed to leave the house for the first time in two weeks. It was just a short walk, but I felt the sun on my face and it reminded me that warmth still exists.", group: "Depression Recovery", likes: 24, liked: false, time: "2h ago" },
  { id: 2, author: "HealingHeart", text: "I had my first panic-free day in months. I kept using the breathing exercises from this app. Small wins matter. 💛", group: "Anxiety Support", likes: 38, liked: false, time: "4h ago" },
  { id: 3, author: "QuietStrength", text: "Grief doesn't get smaller. You just grow bigger around it. Missing my mom today, but I cooked her recipe and it felt like she was here.", group: "Grief & Loss", likes: 52, liked: false, time: "6h ago" },
  { id: 4, author: "NewDawn22", text: "Told my therapist about the nightmares for the first time. Terrifying but also... freeing? Like putting down a weight I didn't know I was carrying.", group: "PTSD Warriors", likes: 19, liked: false, time: "8h ago" },
  { id: 5, author: "MindfulMaya", text: "I sat with my discomfort today instead of running from it. 10 minutes of meditation turned into 20. Progress isn't always loud.", group: "Mindfulness Circle", likes: 31, liked: false, time: "1d ago" },
];

const CommunitiesTab = () => {
  const [posts, setPosts] = useState<SharedExperience[]>(initialPosts);
  const [newPost, setNewPost] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("Anxiety Support");
  const [anonymous, setAnonymous] = useState(true);

  const handleSubmit = () => {
    const trimmed = newPost.trim();
    if (!trimmed || trimmed.length > 500) return;
    const post: SharedExperience = {
      id: Date.now(),
      author: anonymous ? "Anonymous" : "You",
      text: trimmed,
      group: selectedGroup,
      likes: 0,
      liked: false,
      time: "Just now",
    };
    setPosts([post, ...posts]);
    setNewPost("");
  };

  const toggleLike = (id: number) => {
    setPosts(posts.map((p) =>
      p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
    ));
  };

  return (
    <div className="relative min-h-screen pb-24">
      <DynamicBackground />
      <div className="relative z-10 px-5 pt-14 max-w-lg mx-auto">
        <h1 className="font-display text-2xl font-bold text-primary-foreground mb-1">Community</h1>
        <p className="text-primary-foreground/70 text-sm mb-5">You are not alone — share, listen, heal</p>

        {/* Group chips */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide">
          {groups.map((g) => {
            const Icon = g.icon;
            return (
              <button
                key={g.title}
                onClick={() => setSelectedGroup(g.title)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  selectedGroup === g.title
                    ? "bg-brown text-brown-foreground"
                    : "bg-brown/30 text-primary-foreground/80 hover:bg-brown/50"
                }`}
              >
                <Icon size={12} />
                {g.title}
              </button>
            );
          })}
        </div>

        {/* Share experience */}
        <div className="p-4 rounded-2xl bg-brown border border-brown/20 mb-6 animate-fade-in">
          <p className="text-xs font-medium text-brown-foreground mb-2">Share your experience</p>
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value.slice(0, 500))}
            placeholder="What's on your mind? Your story could help someone today..."
            className="w-full bg-brown-foreground/10 rounded-xl p-3 text-sm text-brown-foreground placeholder:text-brown-foreground/50 resize-none focus:outline-none focus:ring-1 focus:ring-brown-foreground/30 min-h-[80px]"
            rows={3}
          />
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAnonymous(!anonymous)}
                className={`text-[10px] px-2.5 py-1 rounded-full font-medium transition-all ${
                  anonymous ? "bg-brown-foreground/20 text-brown-foreground" : "bg-brown-foreground/10 text-brown-foreground/70"
                }`}
              >
                {anonymous ? "🕶 Anonymous" : "👤 As You"}
              </button>
              <span className="text-[10px] text-brown-foreground/60">{newPost.length}/500</span>
            </div>
            <button
              onClick={handleSubmit}
              disabled={!newPost.trim()}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-brown-foreground/20 text-brown-foreground text-xs font-medium disabled:opacity-40 transition-all hover:bg-brown-foreground/30"
            >
              <Send size={12} />
              Share
            </button>
          </div>
        </div>

        {/* Posts feed */}
        <div className="space-y-3">
          {posts.map((post, i) => (
            <div
              key={post.id}
              className="p-4 rounded-2xl bg-brown border border-brown/20 animate-fade-in"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-brown-foreground/10 flex items-center justify-center">
                    <span className="text-xs">🌱</span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-brown-foreground">{post.author}</p>
                    <p className="text-[10px] text-brown-foreground/60">{post.group} · {post.time}</p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-brown-foreground/90 leading-relaxed mb-3">{post.text}</p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleLike(post.id)}
                  className={`flex items-center gap-1 text-xs transition-all ${
                    post.liked ? "text-brown-foreground font-medium" : "text-brown-foreground/60 hover:text-brown-foreground"
                  }`}
                >
                  <ThumbsUp size={13} fill={post.liked ? "currentColor" : "none"} />
                  {post.likes}
                </button>
                <button className="text-xs text-brown-foreground/60 hover:text-brown-foreground flex items-center gap-1">
                  <MessageCircle size={13} />
                  Reply
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunitiesTab;
