import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const Enter = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  const handleEnter = () => {
    navigate("/home");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setScrollY(containerRef.current.scrollTop);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  // Create columns of text
  const columns = 3;
  const rowsPerColumn = 20;
  const text = "sadderdays.world";

  return (
    <motion.div
      ref={containerRef}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-50 overflow-y-auto cursor-pointer"
      onClick={handleEnter}
    >
      {/* Main grid of scrolling text */}
      <div className="min-h-[300vh] relative">
        {/* Three column layout */}
        <div className="fixed inset-0 flex overflow-hidden">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <motion.div
              key={colIndex}
              className="flex-1 flex flex-col"
              style={{
                transform: `translateY(${
                  colIndex % 2 === 0
                    ? -scrollY * 0.5 - colIndex * 50
                    : scrollY * 0.3 - 200 - colIndex * 30
                }px)`,
              }}
            >
              {Array.from({ length: rowsPerColumn * 2 }).map((_, rowIndex) => {
                // Create varying opacity pattern
                const opacityPattern = [1, 0.15, 0.05, 0.25, 0.4, 0.08, 0.2, 0.5];
                const opacity = opacityPattern[(rowIndex + colIndex) % opacityPattern.length];
                
                return (
                  <div
                    key={rowIndex}
                    className="text-white font-black text-[clamp(1.5rem,5vw,3.5rem)] leading-[1.1] tracking-tight py-0.5 px-2"
                    style={{
                      opacity,
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 900,
                    }}
                  >
                    {text}
                  </div>
                );
              })}
            </motion.div>
          ))}
        </div>

        {/* Center "PUSH TO ENTER" overlay */}
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative"
          >
            {/* Glowing backdrop for visibility */}
            <div className="absolute inset-0 bg-black/60 blur-xl scale-150" />
            
            <motion.p
              animate={{ 
                opacity: [0.7, 1, 0.7],
                textShadow: [
                  "0 0 20px rgba(255,255,255,0.3)",
                  "0 0 40px rgba(255,255,255,0.5)",
                  "0 0 20px rgba(255,255,255,0.3)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="relative text-white text-xs md:text-sm tracking-[0.3em] font-medium"
            >
              PUSH TO ENTER
            </motion.p>
          </motion.div>
        </div>

        {/* Bottom marquee */}
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent py-8">
          <div className="overflow-hidden">
            <motion.div
              animate={{ x: [0, -1000] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="flex whitespace-nowrap"
            >
              {Array.from({ length: 10 }).map((_, i) => (
                <span
                  key={i}
                  className="text-white/30 text-[clamp(2rem,8vw,6rem)] font-black tracking-tight mx-4"
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 900 }}
                >
                  sadderdays.world
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Top marquee - opposite direction */}
        <div className="fixed top-0 left-0 right-0 bg-gradient-to-b from-black via-black/80 to-transparent py-8">
          <div className="overflow-hidden">
            <motion.div
              animate={{ x: [-1000, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="flex whitespace-nowrap"
            >
              {Array.from({ length: 10 }).map((_, i) => (
                <span
                  key={i}
                  className="text-white/20 text-[clamp(1rem,4vw,2.5rem)] font-black tracking-tight mx-4"
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 900 }}
                >
                  sadderdays.world
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Grain overlay */}
      <div className="grain-overlay" />
    </motion.div>
  );
};

export default Enter;
