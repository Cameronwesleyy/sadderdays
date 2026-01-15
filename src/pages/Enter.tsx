import { motion, useMotionValue, useSpring } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import crossLogo from "@/assets/cross-logo.png";

const Enter = () => {
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const handleEnter = () => {
    navigate("/home");
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setMousePos({ x, y });
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const text = "SADDERDAYS";
  const pinkColor = "#FFD6EC";

  // Generate random explosion positions for each letter
  const letterExplosions = useMemo(() => {
    return text.split("").map(() => ({
      x: (Math.random() - 0.5) * window.innerWidth * 1.5,
      y: (Math.random() - 0.5) * window.innerHeight * 1.5,
      rotate: (Math.random() - 0.5) * 720,
      scale: 0.5 + Math.random() * 1.5,
    }));
  }, []);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-50 overflow-hidden cursor-pointer"
      onClick={handleEnter}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Exploding letters */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {text.split("").map((letter, index) => {
            const isPink = index % 3 === 0;
            
            return (
              <motion.span
                key={index}
                className="inline-block font-black text-[clamp(3rem,15vw,12rem)] leading-none tracking-tighter"
                style={{
                  color: isPink ? pinkColor : "white",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 900,
                }}
                initial={{ x: 0, y: 0, rotate: 0, scale: 1 }}
                animate={isHovering ? {
                  x: letterExplosions[index].x,
                  y: letterExplosions[index].y,
                  rotate: letterExplosions[index].rotate,
                  scale: letterExplosions[index].scale,
                  opacity: 0.8,
                } : {
                  x: 0,
                  y: 0,
                  rotate: 0,
                  scale: 1,
                  opacity: 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  delay: index * 0.02,
                }}
              >
                {letter}
              </motion.span>
            );
          })}
        </div>
      </div>

      {/* Mouse-reactive glow that follows cursor - pink tinted */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(255, 235, 245, 0.08) 0%, transparent 60%)`,
        }}
      />

      {/* Center cross logo and "PUSH TO ENTER" overlay */}
      <div className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: isHovering ? 0 : 1, 
            scale: isHovering ? 0.5 : 1 
          }}
          transition={{ duration: 0.4 }}
          className="relative flex flex-col items-center gap-6"
        >
          {/* Dark backdrop for visibility */}
          <div className="absolute inset-[-40px] bg-black/70 blur-3xl scale-[2]" />
          
          {/* Cross logo */}
          <motion.img
            src={crossLogo}
            alt="Sadder Days Cross"
            className="relative w-16 md:w-24 h-auto opacity-80"
            animate={{
              opacity: [0.6, 0.9, 0.6],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Push to enter text */}
          <motion.p
            animate={{ 
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="relative text-[11px] md:text-sm tracking-[0.5em] font-medium"
            style={{ color: pinkColor }}
          >
            PUSH TO ENTER
          </motion.p>
        </motion.div>
      </div>

      {/* Grain overlay */}
      <div className="grain-overlay" />
    </motion.div>
  );
};

export default Enter;
