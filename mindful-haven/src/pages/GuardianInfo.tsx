import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Shield, Mail, Phone, UserPlus } from "lucide-react";
import DynamicBackground from "@/components/DynamicBackground";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "sonner";

const GuardianInfo = () => {
  const [guardianEmail, setGuardianEmail] = useState("");
  const [guardianPhone, setGuardianPhone] = useState("");
  const [guardianName, setGuardianName] = useState("");
  const [loading, setLoading] = useState(false);

  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!guardianEmail || !guardianPhone || !guardianName) {
      toast.error(t('guardian_fill_fields') || "Please fill in all guardian details");
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success(t('guardian_saved') || "Guardian information securely saved");
      navigate("/welcome");
    }, 1500);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden">
      <DynamicBackground />
      <div className="w-full max-w-md z-10 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="flex flex-col items-center gap-4 py-4">
           <div className="p-4 bg-brand-soft rounded-[2.5rem] shadow-sm text-brand-tan">
              <Shield size={48} />
           </div>
           <div className="text-center">
              <h1 className="text-4xl font-display font-black text-brand-text-dark italic tracking-tight uppercase">
                {t('guardian_title') || "Trusted Guardian"}
              </h1>
              <p className="text-[10px] font-black text-brand-text/30 uppercase tracking-[0.4em] mt-2">
                {t('guardian_subtitle') || "Safety & Support Network"}
              </p>
           </div>
        </div>

        <Card className="p-8 rounded-[3rem] glass-strong border-white/20 shadow-2xl space-y-8 relative overflow-hidden">
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-sm font-medium text-brand-text/60 italic">
                {t('guardian_desc') || "Add someone you trust who we can reach out to if you need extra support."}
              </p>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <UserPlus className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-tan/40" size={18} />
                <Input
                  type="text"
                  placeholder={t('guardian_name_placeholder') || "Guardian's Name"}
                  value={guardianName}
                  onChange={(e) => setGuardianName(e.target.value)}
                  className="h-14 bg-white/50 backdrop-blur-sm rounded-2xl pl-12 border-none ring-1 ring-brand-tan/5 focus:ring-brand-tan/20 transition-all font-medium text-brand-text-dark"
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-tan/40" size={18} />
                <Input
                  type="email"
                  placeholder={t('guardian_email_placeholder') || "Guardian's Email"}
                  value={guardianEmail}
                  onChange={(e) => setGuardianEmail(e.target.value)}
                  className="h-14 bg-white/50 backdrop-blur-sm rounded-2xl pl-12 border-none ring-1 ring-brand-tan/5 focus:ring-brand-tan/20 transition-all font-medium text-brand-text-dark"
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-tan/40" size={18} />
                <Input
                  type="tel"
                  placeholder={t('guardian_phone_placeholder') || "Guardian's Phone Number"}
                  value={guardianPhone}
                  onChange={(e) => setGuardianPhone(e.target.value)}
                  className="h-14 bg-white/50 backdrop-blur-sm rounded-2xl pl-12 border-none ring-1 ring-brand-tan/5 focus:ring-brand-tan/20 transition-all font-medium text-brand-text-dark"
                />
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full h-16 rounded-[2rem] bg-brand-tan hover:bg-[#ae8159] text-white text-sm font-black uppercase tracking-[0.2em] shadow-lg transition-all duration-500 hover:scale-[1.02] border-none"
            >
              {loading ? t('saving') || "Saving..." : t('continue_journey') || "Continue Journey"}
            </Button>
            
            <button 
              onClick={() => navigate("/welcome")}
              className="w-full text-[10px] font-black text-brand-text/20 uppercase tracking-[0.4em] hover:text-brand-tan transition-colors"
            >
              {t('skip_for_now') || "Skip for now"}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default GuardianInfo;
