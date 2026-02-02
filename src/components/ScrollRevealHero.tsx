import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ScrollRevealHeroProps {
  imageSrc: string;
  imageAlt: string;
  children?: React.ReactNode;
  onHoverChange?: (isHovered: boolean) => void;
}

const ScrollRevealHero = ({ imageSrc, imageAlt, children, onHoverChange }: ScrollRevealHeroProps) => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  // For desktop scroll parallax
  const { scrollY } = useScroll();
  const backgroundOpacity = useTransform(scrollY, [0, 300], [0, 0.4]);
  const imageY = useTransform(scrollY, [0, 500], [0, -150]);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
      setImageLoaded(true);
    };
    img.src = imageSrc;
  }, [imageSrc]);

  if (isMobile) {
    // Mobile: Horizontal scrollable hero that shows full image
    const aspectRatio = imageDimensions.width / imageDimensions.height || 16 / 9;
    const imageWidth = `${100 * aspectRatio}vh`; // Width based on viewport height

    return (
      <section 
        className="relative h-screen w-screen overflow-hidden"
        onMouseEnter={() => onHoverChange?.(true)}
        onMouseLeave={() => onHoverChange?.(false)}
      >
        {/* Scrollable container */}
        <div 
          ref={scrollContainerRef}
          className="h-full overflow-x-auto overflow-y-hidden scrollbar-hide"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <div 
            className="h-full relative"
            style={{ width: imageLoaded ? imageWidth : '100vw', minWidth: '100vw' }}
          >
            <img 
              src={imageSrc} 
              alt={imageAlt} 
              className="h-full w-auto object-cover object-center"
              style={{ minWidth: '100vw' }}
            />
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/60"
        >
          <motion.div
            animate={{ x: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <svg className="w-4 h-4 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
          <span className="text-[8px] tracking-widest-custom uppercase">Swipe</span>
          <motion.div
            animate={{ x: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <svg className="w-4 h-4 -rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
        
        {/* Children (text overlay etc) */}
        {children}
      </section>
    );
  }

  // Desktop: Vertical scroll reveals more of image with faded background
  return (
    <section 
      ref={containerRef}
      className="relative h-[120vh] w-screen overflow-hidden"
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => onHoverChange?.(false)}
    >
      {/* Background faded image - fixed position */}
      <motion.div 
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{ opacity: backgroundOpacity }}
      >
        <img 
          src={imageSrc} 
          alt="" 
          aria-hidden="true"
          className="w-full h-full object-cover object-[center_30%] blur-sm scale-105"
        />
        <div className="absolute inset-0 bg-background/60" />
      </motion.div>

      {/* Main scrollable image container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div 
          className="absolute inset-0 w-full"
          style={{ y: imageY }}
        >
          <img 
            src={imageSrc} 
            alt={imageAlt} 
            className="w-full h-[140vh] object-cover object-[center_25%]"
          />
        </motion.div>

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
        
        {/* Children (text overlay etc) */}
        {children}

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/60"
        >
          <span className="text-[8px] tracking-widest-custom uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ScrollRevealHero;
