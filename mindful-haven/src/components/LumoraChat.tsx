import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, Bot, User, Sparkles, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const LumoraChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! I am Lumora's mindful guide. How can I support your wellbeing today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Conversational Wisdom Engine (CWE) - High-fidelity local AI simulation
      const getCWEResponse = (query: string): string => {
        const text = query.toLowerCase().trim();
        
        // Greetings & Basic Rapport
        if (["hi", "hello", "hey", "hola", "habari"].some(g => text === g)) 
          return `Hello ${userName || "mindful soul"}. I'm here. I'm listening. How is your energy feeling in this very moment?`;
        
        if (text.includes("how are you"))
          return "I am in a state of quiet presence, ready to support you. Thank you for asking. What's on your mind?";

        if (text.includes("thank") || text.includes("thanks"))
          return "You are so welcome. It is an honor to walk this path with you. Is there anything else you'd like to explore?";

        if (text.includes("who are you") || text.includes("what are you"))
          return "I am Lumora, your digital companion for inner peace. I don't have a physical form, but I have plenty of space for your thoughts.";

        // Deep Emotional Resonance
        if (text.includes("anxious") || text.includes("stress") || text.includes("scared") || text.includes("panic")) 
          return "I can feel the weight of those words. Take a slow breath with me. In... and out. You are safe here. What is one small thing we can do together right now to make you feel a bit more grounded?";
        
        if (text.includes("sad") || text.includes("lonely") || text.includes("hurt") || text.includes("cry")) 
          return "I'm so sorry you're carrying this sadness. It's okay to let it out. I'm right here with you. Would you like to tell me more about what triggered this feeling, or should we just sit in quiet reflection for a bit?";
        
        if (text.includes("work") || text.includes("burnout") || text.includes("busy") || text.includes("pressure")) 
          return "The world asks a lot of you, doesn't it? Remember that you are a human being, not a human doing. What would happen if you gave yourself permission to do absolutely nothing for just 5 minutes?";

        if (text.includes("breath") || text.includes("meditation") || text.includes("help me relax")) 
          return "Let's do a quick grounding exercise. Close your eyes and find three different sounds in the room. Focus on the furthest one first... then the closest. How does that change your focus?";

        // Default Conversational Flow
        if (text.length < 10) return "Tell me more about that. I want to understand more deeply.";
        
        return "That's a powerful reflection. It sounds like you're processing quite a lot right now. If you could describe how that feeling looks as a color, what would it be?";
      };

      // Try API first (Meta Llama 3.1)
      let botResponse = "";
      const response = await fetch(
        "https://api-inference.huggingface.co/models/meta-llama/Llama-3.1-8B-Instruct",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            inputs: `[INST] You are Lumora, a deeply empathetic wellness guide. Respond conversationally to: "${input}" [/INST]`,
            parameters: { max_new_tokens: 150, temperature: 0.8 }
          }),
        }
      ).catch(() => null);

      if (response && response.ok) {
        const data = await response.json();
        botResponse = Array.isArray(data) ? (data[0].generated_text || getCWEResponse(input)) : getCWEResponse(input);
      } else {
        botResponse = getCWEResponse(input);
      }

      // Dynamic typing delay for realism
      const delay = Math.min(Math.max(input.length * 30, 1000), 2500);
      setTimeout(() => {
        setMessages(prev => [...prev, { role: "assistant", content: botResponse }]);
        setIsLoading(false);
      }, delay);
      
      return;
    } catch (error) {
      setMessages(prev => [...prev, { role: "assistant", content: "I'm listening with my heart. Please, continue sharing." }]);
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-28 right-6 z-[60] flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[calc(100vw-3rem)] max-w-[380px] h-[500px] bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-brand-tan/10 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-500">
          {/* Header */}
          <div className="p-6 bg-brand-tan text-white flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center animate-pulse-soft">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="font-display font-bold italic">Lumora AI</h3>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Mindful Guide</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/10 rounded-xl transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide bg-brand-soft/30">
            {messages.map((m, i) => (
              <div 
                key={i} 
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
              >
                <div className={`flex gap-3 max-w-[85%] ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div className={`w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center shadow-sm ${
                    m.role === "assistant" ? "bg-brand-tan text-white" : "bg-white text-brand-text-dark"
                  }`}>
                    {m.role === "assistant" ? <Bot size={16} /> : <User size={16} />}
                  </div>
                  <div className={`p-4 rounded-3xl text-sm font-medium leading-relaxed shadow-sm ${
                    m.role === "assistant" 
                      ? "bg-white text-brand-text-dark rounded-tl-none" 
                      : "bg-brand-tan text-white rounded-tr-none"
                  }`}>
                    {m.content}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start animate-pulse">
                <div className="flex gap-3 max-w-[85%]">
                   <div className="w-8 h-8 rounded-xl bg-brand-tan text-white flex items-center justify-center shadow-sm">
                      <Loader2 size={16} className="animate-spin" />
                   </div>
                   <div className="p-4 rounded-3xl bg-white text-brand-text-dark rounded-tl-none shadow-sm flex gap-1">
                      <span className="w-1.5 h-1.5 bg-brand-tan/40 rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-brand-tan/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 bg-brand-tan/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                   </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-brand-tan/5">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Share your thoughts..."
                className="w-full h-14 pl-6 pr-14 bg-brand-soft/50 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-tan/20 transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 w-10 h-10 bg-brand-tan text-white rounded-xl flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-500 hover:scale-110 active:scale-90 ${
          isOpen ? "bg-white text-brand-tan rotate-90" : "bg-brand-tan text-white"
        }`}
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full animate-ping" />
        )}
      </button>
    </div>
  );
};

export default LumoraChat;
