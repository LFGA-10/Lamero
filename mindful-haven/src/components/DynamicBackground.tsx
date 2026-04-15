import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

const backgrounds = [
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1500624239109-db1957703270?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1518173946687-a4c8a98039f5?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&q=80&w=1000",
];

// Combine into 40 pairs (cycling backgrounds)
const pages = Array.from({ length: 40 }).map((_, i) => ({
  bg: backgrounds[i % backgrounds.length],
  quoteKey: `quote_${(i % 20) + 1}` // Cycling through 20 quotes
}));

const DynamicBackground = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % pages.length);
    }, 10000); // 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {pages.map((page, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-all duration-[2000ms] ease-in-out"
          style={{
            opacity: i === currentIndex ? 1 : 0,
            zIndex: i === currentIndex ? 1 : 0,
          }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${page.bg})` }}
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
          
          <div className="absolute inset-0 flex items-center justify-center p-12 text-center">
            {i === currentIndex && (
              <div className="animate-in fade-in zoom-in-95 duration-1000 max-w-sm">
                <p className="text-white/90 text-2xl font-display font-light italic leading-relaxed drop-shadow-xl">
                  "{t(page.quoteKey)}"
                </p>
                <div className="w-12 h-0.5 bg-brand-tan/40 mx-auto mt-6 rounded-full" />
              </div>
            )}
          </div>
        </div>
      ))}
      <div className="absolute inset-0 bg-background/20 dark:bg-overlay" />
    </div>
  );
};

export default DynamicBackground;
