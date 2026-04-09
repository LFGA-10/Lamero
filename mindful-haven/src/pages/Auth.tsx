import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Leaf, User, Mail, Lock } from "lucide-react";
import DynamicBackground from "@/components/DynamicBackground";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { apiRequest } from "@/lib/api-client";
import { toast } from "sonner";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsernameInput] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { t, setUserName } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleBegin = async () => {
    if (!email || !password || (!isLogin && !username)) {
      toast.error("Please fill in all peaceful fields");
      return;
    }

    setLoading(true);
    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const payload = isLogin 
        ? { email, password } 
        : { username, email, password };
      
      const data = await apiRequest(endpoint, {
        method: "POST",
        body: JSON.stringify(payload)
      });

      if (data.twoFactorRequired) {
        toast.info("2FA synchronization required");
        // Handle 2FA flow if needed
        return;
      }

      login(data, data.token);
      setUserName(data.username);
      toast.success(isLogin ? "Welcome back to the sanctuary" : "Your journey begins now");
      navigate("/welcome");
    } catch (err: any) {
      toast.error(err.message || "Failed to resonate with sanctuary server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden">
      <DynamicBackground />
      <div className="w-full max-w-md z-10 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="flex flex-col items-center gap-4 py-8">
           <div className="p-4 bg-brand-soft rounded-[2.5rem] shadow-sm text-brand-tan">
              <Leaf size={48} />
           </div>
           <div className="text-center">
              <h1 className="text-6xl font-display font-black text-brand-text-dark italic tracking-tight uppercase">
                Lumora
              </h1>
              <p className="text-[10px] font-black text-brand-text/30 uppercase tracking-[0.4em] mt-2">
                {t('sanctuary')}
              </p>
           </div>
        </div>

        <Card className="p-8 rounded-[3rem] glass-strong border-white/20 shadow-2xl space-y-8 relative overflow-hidden group">
          <div className="flex gap-4 border-b border-brand-tan/10 pb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 text-xs font-black uppercase tracking-widest transition-all ${
                isLogin ? "text-brand-tan border-b-2 border-brand-tan pb-2" : "text-brand-text/30"
              }`}
            >
              {t('sign_in')}
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 text-xs font-black uppercase tracking-widest transition-all ${
                !isLogin ? "text-brand-tan border-b-2 border-brand-tan pb-2" : "text-brand-text/30"
              }`}
            >
              {t('sign_up')}
            </button>
          </div>

          <div className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-tan/40" size={18} />
                <Input
                  type="text"
                  placeholder={t('user_placeholder')}
                  value={username}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  className="h-14 bg-white/50 backdrop-blur-sm rounded-2xl pl-12 border-none ring-1 ring-brand-tan/5 focus:ring-brand-tan/20 transition-all font-medium text-brand-text-dark"
                />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-tan/40" size={18} />
              <Input
                type="email"
                placeholder={t('email_placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 bg-white/50 backdrop-blur-sm rounded-2xl pl-12 border-none ring-1 ring-brand-tan/5 focus:ring-brand-tan/20 transition-all font-medium text-brand-text-dark"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-tan/40" size={18} />
              <Input
                type="password"
                placeholder={t('pass_placeholder')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-14 bg-white/50 backdrop-blur-sm rounded-2xl pl-12 border-none ring-1 ring-brand-tan/5 focus:ring-brand-tan/20 transition-all font-medium text-brand-text-dark"
              />
            </div>
          </div>

          <div className="space-y-4">
            <Button
              onClick={handleBegin}
              disabled={loading}
              className="w-full h-16 rounded-[2rem] bg-brand-tan hover:bg-[#ae8159] text-white text-sm font-black uppercase tracking-[0.2em] shadow-lg transition-all duration-500 hover:scale-[1.02] border-none disabled:opacity-50"
            >
              {loading ? "Synching..." : (isLogin ? t('welcome') : t('begin'))}
            </Button>
            {isLogin && (
              <div className="flex justify-center">
                 <button className="text-[10px] font-black text-brand-text/30 uppercase tracking-widest hover:text-brand-tan transition-colors">
                    {t('forgot_pass')}
                 </button>
              </div>
            )}
          </div>
        </Card>

        <div className="text-center">
           <p className="text-[10px] font-black text-brand-text/20 uppercase tracking-[0.2em] px-8 leading-relaxed">
             {t('ethics_guide')}
           </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
