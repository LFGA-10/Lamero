import { useState, useEffect } from "react";
import bg1 from "@/assets/bg-1.jpg";
import bg2 from "@/assets/bg-2.jpg";
import bg3 from "@/assets/bg-3.jpg";
import bg4 from "@/assets/bg-4.jpg";

const backgrounds = [bg1, bg2, bg3, bg4];

const DynamicBackground = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % backgrounds.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {backgrounds.map((bg, i) => (
        <div
          key={i}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-[3000ms] ease-in-out"
          style={{
            backgroundImage: `url(${bg})`,
            opacity: i === currentIndex ? 1 : 0,
          }}
        />
      ))}
      <div className="absolute inset-0" style={{ background: "hsl(var(--overlay))" }} />
    </div>
  );
};

export default DynamicBackground;
