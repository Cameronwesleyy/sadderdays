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
      className="fixed inset-0 bg-background z-50 overflow-hidden cursor-pointer flex items-center justify-center"
      onClick={handleEnter}
    >
      {/* Napkin container */}
      <div className="relative w-72 md:w-96 aspect-square">
        <AnimatePresence>
          {!isExiting ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative flex flex-col items-center"
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
              
              {/* Push to enter text overlay */}
              <motion.p
                animate={{ 
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-4 text-[10px] md:text-xs tracking-[0.4em] font-light text-neutral-400"
              >
                PUSH TO ENTER
              </motion.p>
            </motion.div>
          ) : (
            // Torn halves flying apart
            <>
              {/* Left half */}
              <motion.div
                initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                animate={{ 
                  x: -300, 
                  y: -100, 
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
                  x: 300, 
                  y: 100, 
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