import { useEffect, useRef, useState } from "react";

interface PixelatedImageProps {
  src: string;
  alt: string;
  className?: string;
  pixelSize?: number;
}

const PixelatedImage = ({ src, alt, className = "", pixelSize = 12 }: PixelatedImageProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateDimensions = () => {
      const rect = container.getBoundingClientRect();
      setDimensions({ width: rect.width, height: rect.height });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0 || dimensions.height === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    img.onload = () => {
      // Set canvas to container size (square aspect ratio)
      canvas.width = dimensions.width;
      canvas.height = dimensions.height;

      // Calculate small size for pixelation
      const smallWidth = Math.ceil(canvas.width / pixelSize);
      const smallHeight = Math.ceil(canvas.height / pixelSize);

      // Disable image smoothing for pixelated effect
      ctx.imageSmoothingEnabled = false;

      // Calculate cover sizing (like object-fit: cover)
      const imgAspect = img.width / img.height;
      const canvasAspect = canvas.width / canvas.height;
      
      let sx = 0, sy = 0, sWidth = img.width, sHeight = img.height;
      
      if (imgAspect > canvasAspect) {
        // Image is wider - crop sides
        sWidth = img.height * canvasAspect;
        sx = (img.width - sWidth) / 2;
      } else {
        // Image is taller - crop top/bottom
        sHeight = img.width / canvasAspect;
        sy = (img.height - sHeight) / 2;
      }

      // Draw small version with cover cropping
      ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, smallWidth, smallHeight);

      // Scale up with pixelation
      ctx.drawImage(
        canvas,
        0, 0, smallWidth, smallHeight,
        0, 0, canvas.width, canvas.height
      );
    };
  }, [src, pixelSize, dimensions]);

  return (
    <div ref={containerRef} className={className}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        aria-label={alt}
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  );
};

export default PixelatedImage;
