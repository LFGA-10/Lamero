import React, { useState } from "react";
import { apiRequest } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ShieldCheck, Copy, Check } from "lucide-react";

const TwoFactorSetup = () => {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSetup, setIsSetup] = useState(false);

  const handleStartSetup = async () => {
    setLoading(true);
    try {
      const data = await apiRequest("/auth/setup-2fa", { method: "POST" });
      setQrCode(data.qrCode);
      setSecret(data.secret);
      setIsSetup(true);
    } catch (err: any) {
      toast.error(err.message || "Failed to start 2FA setup");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!token) return;
    setLoading(true);
    try {
      await apiRequest("/auth/verify-2fa", {
        method: "POST",
        body: JSON.stringify({ token }),
      });
      toast.success("2FA successfully enabled");
      setIsSetup(false);
      setQrCode(null);
    } catch (err: any) {
      toast.error(err.message || "Invalid token");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {!isSetup ? (
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="p-4 bg-brand-tan/10 rounded-full text-brand-tan inline-block">
            <ShieldCheck size={48} />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-bold text-brand-text-dark">Two-Factor Authentication</h3>
            <p className="text-sm text-brand-text/60 mt-2 max-w-[280px]">
              Add an extra layer of protection to your sanctuary by requiring a code from your authentication app.
            </p>
          </div>
          <Button 
            onClick={handleStartSetup} 
            loading={loading}
            className="w-full bg-brand-tan hover:bg-[#ae8159] rounded-2xl h-14 uppercase tracking-widest text-[10px] font-black"
          >
            Enable 2FA
          </Button>
        </div>
      ) : (
        <div className="space-y-6 animate-in slide-in-from-bottom-4">
          <div className="text-center space-y-2">
            <h3 className="font-bold text-brand-text-dark">Step 1: Scan QR Code</h3>
            <p className="text-[10px] text-brand-text/50 uppercase tracking-widest">Use Google Authenticator or Authy</p>
          </div>
          
          <div className="flex justify-center bg-white p-4 rounded-3xl shadow-inner border border-brand-tan/5">
             {qrCode && <img src={qrCode} alt="2FA QR Code" className="w-48 h-48" />}
          </div>

          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase text-brand-text/30 tracking-widest text-center">Manual Entry Code</p>
            <div className="flex items-center gap-2 bg-brand-soft p-4 rounded-2xl">
               <code className="text-sm font-bold text-brand-tan flex-1 truncate">{secret}</code>
               <button onClick={() => {
                 navigator.clipboard.writeText(secret || "");
                 toast.success("Secret copied");
               }} className="text-brand-tan/40 hover:text-brand-tan">
                 <Copy size={16} />
               </button>
            </div>
          </div>

          <div className="space-y-3">
             <p className="text-[10px] font-black uppercase text-brand-text/30 tracking-widest text-center">Step 2: Enter Verification Code</p>
             <Input 
               value={token}
               onChange={(e) => setToken(e.target.value)}
               placeholder="000000"
               className="h-14 bg-white/50 text-center text-xl font-bold tracking-[0.5em] rounded-2xl border-none ring-1 ring-brand-tan/20"
               maxLength={6}
             />
             <Button 
               onClick={handleVerify}
               loading={loading}
               className="w-full h-14 bg-brand-tan rounded-2xl font-black uppercase tracking-widest text-[10px]"
             >
               Verify & Activate
             </Button>
             <button onClick={() => setIsSetup(false)} className="w-full text-[10px] font-black text-brand-text/30 uppercase tracking-[0.4em] pt-2">
                Cancel
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TwoFactorSetup;
