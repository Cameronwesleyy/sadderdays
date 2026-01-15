import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import napkin from "@/assets/napkin.png";

const Enter = () => {
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);

  const handleEnter = () => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      navigate("/home");
    }, 1000);
  };

  return (
    <motion.div
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-hidden cursor-pointer flex items-center justify-center"
      onClick={handleEnter}
      style={{
        backgroundColor: '#b8b5b0',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundBlendMode: 'overlay',
      }}
    >
      {/* Napkin container */}
      <div className="relative w-[80vw] md:w-[50vw] max-w-2xl aspect-square flex flex-col items-center">
        <AnimatePresence>
          {!isExiting ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative flex flex-col items-center w-full"
            >
              {/* Napkin image */}
              <motion.img
                src={napkin}
                alt="Sadder Days Napkin"
                className="w-full h-auto"
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Push text underneath */}
              <motion.p
                animate={{ 
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="mt-6 text-xs md:text-sm tracking-[0.5em] font-light text-neutral-500 uppercase"
              >
                push
              </motion.p>
            </motion.div>
          ) : (
            // Torn halves flying apart
            <>
              {/* Left half */}
              <motion.div
                initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                animate={{ 
                  x: -400, 
                  y: -150, 
                  rotate: -25,
                  opacity: 0,
                }}
                transition={{ 
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: 'polygon(0 0, 52% 0, 48% 100%, 0 100%)' }}
              >
                <img
                  src={napkin}
                  alt=""
                  className="w-full h-auto"
                />
              </motion.div>

              {/* Right half */}
              <motion.div
                initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                animate={{ 
                  x: 400, 
                  y: 150, 
                  rotate: 25,
                  opacity: 0,
                }}
                transition={{ 
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: 'polygon(48% 0, 100% 0, 100% 100%, 52% 100%)' }}
              >
                <img
                  src={napkin}
                  alt=""
                  className="w-full h-auto"
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Grain overlay */}
      <div className="grain-overlay" />
    </motion.div>
  );
};

export default Enter;