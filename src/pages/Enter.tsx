import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import crossLogo from "@/assets/cross-logo.png";

const Enter = () => {
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const handleEnter = () => {
    navigate("/home");
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    setMousePos({ x, y });
  };

  const pinkColor = "#FFD6EC";

  return (
    <motion.div
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-50 overflow-hidden cursor-pointer"
      onClick={handleEnter}
      onMouseMove={handleMouseMove}
    >
      {/* Mouse-reactive glow that follows cursor - pink tinted */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(255, 235, 245, 0.1) 0%, transparent 60%)`,
        }}
      />

      {/* Center cross logo and "PUSH TO ENTER" overlay */}
      <div className="fixed inset-0 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative flex flex-col items-center gap-6"
        >
          {/* Cross logo */}
          <motion.img
            src={crossLogo}
            alt="Sadder Days Cross"
            className="relative w-20 md:w-28 h-auto opacity-80"
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
