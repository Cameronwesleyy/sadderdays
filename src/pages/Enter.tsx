import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Enter = () => {
  const navigate = useNavigate();

  const handleEnter = () => {
    navigate("/home");
  };

  return (
    <motion.div
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background z-50 overflow-y-auto cursor-pointer"
      onClick={handleEnter}
    >
      {/* Vertical scroll marquee */}
      <div className="min-h-[200vh] flex flex-col items-center justify-start pt-[15vh] pb-32">
        {/* Domain text - ultra thin Inter */}
        {Array.from({ length: 14 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.03 }}
            className={`text-3xl md:text-5xl lg:text-7xl tracking-tighter-custom mb-2 ${
              i % 4 === 0
                ? "text-foreground"
                : i % 4 === 1
                ? "text-foreground/15"
                : i % 4 === 2
                ? "text-foreground/5"
                : "text-foreground/25"
            }`}
            style={{ fontWeight: 300 }}
          >
            sadderdays.world
          </motion.div>
        ))}

        {/* Center CTA - red */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="fixed bottom-12 left-1/2 -translate-x-1/2 text-center"
        >
          <motion.p
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="text-sd-red text-[10px] tracking-widest-custom"
            style={{ fontWeight: 400 }}
          >
            PUSH TO ENTER
          </motion.p>
        </motion.div>

        {/* More text as you scroll */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={`bottom-${i}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 + i * 0.03 }}
            className={`text-3xl md:text-5xl lg:text-7xl tracking-tighter-custom mb-2 ${
              i % 4 === 0
                ? "text-foreground/5"
                : i % 4 === 1
                ? "text-foreground/25"
                : i % 4 === 2
                ? "text-foreground/15"
                : "text-foreground"
            }`}
            style={{ fontWeight: 300 }}
          >
            sadderdays.world
          </motion.div>
        ))}
      </div>

      {/* Grain overlay */}
      <div className="grain-overlay" />
    </motion.div>
  );
};

export default Enter;
