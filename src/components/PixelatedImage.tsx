import { useEffect, useRef } from "react";

interface PixelatedImageProps {
  src: string;
  alt: string;
  className?: string;
  pixelSize?: number;
}

const PixelatedImage = ({ src, alt, className = "", pixelSize = 12 }: PixelatedImageProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    img.onload = () => {
      const aspectRatio = img.width / img.height;
      
      // Set canvas size
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetWidth / aspectRatio;

      // Calculate small size for pixelation
      const smallWidth = Math.ceil(canvas.width / pixelSize);
      const smallHeight = Math.ceil(canvas.height / pixelSize);

      // Disable image smoothing for pixelated effect
      ctx.imageSmoothingEnabled = false;

      // Draw small version
      ctx.drawImage(img, 0, 0, smallWidth, smallHeight);

      // Scale up with pixelation
      ctx.drawImage(
        canvas,
        0, 0, smallWidth, smallHeight,
        0, 0, canvas.width, canvas.height
      );
    };
  }, [src, pixelSize]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-label={alt}
      style={{ imageRendering: "pixelated" }}
    />
  );
};

export default PixelatedImage;
