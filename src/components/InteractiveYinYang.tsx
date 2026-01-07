import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useState } from "react";
import yinYangImage from "@/assets/yin-yang-interactive.png";

const InteractiveYinYang = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(mouseY, [-100, 100], [15, -15]);
  const rotateY = useTransform(mouseX, [-100, 100], [-15, 15]);
  
  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div 
      className="relative flex items-center justify-center py-16 md:py-24"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
        }}
        className="relative"
      >
        <motion.img
          src={yinYangImage}
          alt="Yin Yang"
          className="w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 cursor-pointer select-none"
          animate={{
            rotate: isHovered ? 360 : 0,
          }}
          transition={{
            rotate: {
              duration: 8,
              ease: "linear",
              repeat: isHovered ? Infinity : 0,
            },
          }}
          whileTap={{ scale: 0.95 }}
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.1}
        />
        
        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          animate={{
            boxShadow: isHovered 
              ? "0 0 60px 20px rgba(255,255,255,0.15)" 
              : "0 0 0px 0px rgba(255,255,255,0)",
          }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </div>
  );
};

export default InteractiveYinYang;
