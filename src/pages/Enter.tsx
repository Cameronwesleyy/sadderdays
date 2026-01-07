import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const Enter = () => {
  const [entered, setEntered] = useState(false);

  return (
    <AnimatePresence>
      {!entered ? (
        <motion.div
          key="enter"
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background z-50 overflow-hidden cursor-pointer"
          onClick={() => setEntered(true)}
        >
          {/* Marquee Text Background */}
          <div className="absolute inset-0 flex flex-col justify-center overflow-hidden">
            {Array.from({ length: 15 }).map((_, rowIndex) => (
              <motion.div
                key={rowIndex}
                className="whitespace-nowrap"
                animate={{
                  x: rowIndex % 2 === 0 ? [0, -1920] : [-1920, 0],
                }}
                transition={{
                  duration: 20 + rowIndex * 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <span className="text-5xl md:text-7xl font-bold tracking-tighter-custom inline-block">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <span
                      key={i}
                      className={`mr-8 ${
                        (rowIndex + i) % 3 === 0
                          ? "text-foreground"
                          : (rowIndex + i) % 3 === 1
                          ? "text-foreground/40"
                          : "text-foreground/20"
                      }`}
                    >
                      SADDER DAYS.
                    </span>
                  ))}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Center Enter Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center bg-background/80 backdrop-blur-sm px-12 py-8"
            >
              <p className="text-xs tracking-widest-custom text-muted-foreground mb-2">
                "더 슬픈 날들"
              </p>
              <motion.p
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-xs tracking-widest-custom"
              >
                enter.
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="redirect"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Link to="/home" replace>
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ delay: 0.1 }}
              onAnimationComplete={() => {
                window.location.href = "/home";
              }}
            />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Enter;
