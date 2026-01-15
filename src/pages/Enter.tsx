import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import handsEnter from "@/assets/hands-enter.jpg";

const Enter = () => {
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);

  const handleEnter = () => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      navigate("/home");
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Home page preview underneath (revealed as hands open) */}
      <div className="absolute inset-0 bg-background" />

      {/* Hands overlay that splits apart */}
      <motion.div
        className="fixed inset-0 cursor-pointer"
        onClick={handleEnter}
      >
        <AnimatePresence>
          {!isExiting ? (
            <>
              {/* Full image with text overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0"
              >
                <img
                  src={handsEnter}
                  alt="Enter"
                  className="w-full h-full object-cover"
                />
                
                {/* Push to enter text */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ 
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <p className="text-sm md:text-base tracking-[0.4em] font-medium text-white drop-shadow-lg">
                    PUSH TO ENTER
                  </p>
                </motion.div>
              </motion.div>
            </>
          ) : (
            <>
              {/* Left hand (palm up) - slides down-left */}
              <motion.div
                initial={{ x: 0, y: 0 }}
                animate={{ x: "-60%", y: "40%" }}
                transition={{ 
                  duration: 1.1,
                  ease: [0.65, 0, 0.35, 1],
                }}
                className="absolute inset-0 overflow-hidden"
                style={{ 
                  clipPath: 'polygon(0 0, 0 100%, 45% 100%, 52% 92%, 55% 82%, 50% 72%, 42% 62%, 38% 52%, 40% 42%, 48% 32%, 55% 22%, 50% 12%, 42% 5%, 30% 0)'
                }}
              >
                <img
                  src={handsEnter}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Right hand (back of hand) - slides up-right */}
              <motion.div
                initial={{ x: 0, y: 0 }}
                animate={{ x: "60%", y: "-40%" }}
                transition={{ 
                  duration: 1.1,
                  ease: [0.65, 0, 0.35, 1],
                }}
                className="absolute inset-0 overflow-hidden"
                style={{ 
                  clipPath: 'polygon(30% 0, 42% 5%, 50% 12%, 55% 22%, 48% 32%, 40% 42%, 38% 52%, 42% 62%, 50% 72%, 55% 82%, 52% 92%, 45% 100%, 100% 100%, 100% 0)'
                }}
              >
                <img
                  src={handsEnter}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Grain overlay */}
      <div className="grain-overlay pointer-events-none" />
    </div>
  );
};

export default Enter;