import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import crossLogo from "@/assets/cross-logo.png";

const Enter = () => {
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const col1Y = useTransform(smoothY, [0, 1], [100, -100]);
  const col2Y = useTransform(smoothY, [0, 1], [-80, 80]);
  const col3Y = useTransform(smoothY, [0, 1], [120, -120]);
  
  const col1X = useTransform(smoothX, [0, 1], [-30, 30]);
  const col2X = useTransform(smoothX, [0, 1], [20, -20]);
  const col3X = useTransform(smoothX, [0, 1], [-25, 25]);

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

  const columns = 3;
  const rowsPerColumn = 30;
  const text = "sadderdays.world";
  const pinkColor = "#FFD6EC";

  const columnTransforms = [
    { y: col1Y, x: col1X, direction: 1 },
    { y: col2Y, x: col2X, direction: -1 },
    { y: col3Y, x: col3X, direction: 1 },
  ];

  // Pre-generate gentle shift values for all letters
  const shiftData = useMemo(() => {
    const data: { x: number; y: number; rotate: number }[][][] = [];
    for (let col = 0; col < columns; col++) {
      data[col] = [];
      for (let row = 0; row < rowsPerColumn * 2; row++) {
        data[col][row] = [];
        for (let char = 0; char < text.length; char++) {
          data[col][row][char] = {
            x: (Math.random() - 0.5) * 40,
            y: (Math.random() - 0.5) * 30,
            rotate: (Math.random() - 0.5) * 15,
          };
        }
      }
    }
    return data;
  }, []);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-50 overflow-hidden cursor-pointer"
      onClick={handleEnter}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Background grid of repeating text with exploding letters */}
      <div className="absolute inset-0 flex w-screen">
        {Array.from({ length: columns }).map((_, colIndex) => (
          <motion.div
            key={colIndex}
            className="flex-1 flex flex-col items-center overflow-visible"
            style={{
              y: isHovering ? 0 : columnTransforms[colIndex].y,
              x: isHovering ? 0 : columnTransforms[colIndex].x,
            }}
          >
            <motion.div
              animate={isHovering ? {} : {
                y: columnTransforms[colIndex].direction === 1 
                  ? ["0%", "-50%"] 
                  : ["-50%", "0%"],
              }}
              transition={{
                duration: 20 + colIndex * 5,
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex flex-col items-center"
            >
              {[...Array(2)].map((_, loopIndex) => (
                <div key={loopIndex} className="flex flex-col items-center">
                  {Array.from({ length: rowsPerColumn }).map((_, rowIndex) => {
                    const actualRowIndex = loopIndex * rowsPerColumn + rowIndex;
                    const opacityPattern = [1, 0.12, 0.04, 0.22, 0.38, 0.06, 0.18, 0.45, 0.08, 0.3];
                    const baseOpacity = opacityPattern[(rowIndex + colIndex * 3) % opacityPattern.length];
                    const isPinkRow = (rowIndex + colIndex * 2) % 5 === 0;
                    
                    return (
                      <div
                        key={rowIndex}
                        className="whitespace-nowrap"
                      >
                        {text.split("").map((char, charIndex) => {
                          const isPink = isPinkRow;
                          const textColor = isPink ? pinkColor : "white";
                          const finalOpacity = isPink ? 0.85 : baseOpacity;
                          const shift = shiftData[colIndex]?.[actualRowIndex]?.[charIndex] || { x: 0, y: 0, rotate: 0 };
                          
                          return (
                            <motion.span
                              key={charIndex}
                              className="inline-block font-thin text-[clamp(1.4rem,5vw,3.5rem)] leading-[1.1] tracking-tight"
                              style={{
                                color: textColor,
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: 100,
                              }}
                              animate={isHovering ? {
                                x: shift.x,
                                y: shift.y,
                                rotate: shift.rotate,
                                opacity: finalOpacity,
                              } : {
                                x: 0,
                                y: 0,
                                rotate: 0,
                                opacity: finalOpacity,
                              }}
                              transition={{
                                type: "spring",
                                stiffness: 120,
                                damping: 20,
                              }}
                            >
                              {char}
                            </motion.span>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              ))}
            </motion.div>
          </motion.div>
        ))}
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
            opacity: 1, 
            scale: 1 
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
            className="relative text-[11px] md:text-sm tracking-[0.5em] font-thin"
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
